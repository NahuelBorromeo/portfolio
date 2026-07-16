---
title: "Splitting SwiftUI views: computed properties vs real View structs"
description: "Breaking a big body into computed properties feels like clean factoring — but it does nothing for performance. Here's the invalidation boundary that explains why, from first principles."
pubDate: 2026-07-07
series: "Become a better iOS engineer"
order: 2
tags: ["swiftui", "performance", "first-principles"]
---

Your `body` got long, so you broke it into a few `private var` computed
properties. It reads better now. But if you did it expecting a performance
win, nothing changed — and understanding why teaches you how SwiftUI actually
decides what to re-evaluate.

## First principle: what triggers a re-evaluation

A SwiftUI view's `body` is recomputed whenever one of the dependencies it
*reads* changes — a `@State`, a `@Binding`, an `@Observable` property, an
`@Environment` value. SwiftUI tracks those reads, and when one of them
invalidates, it calls `body` again.

The unit of that tracking is the **`View` struct**. Each struct has one
`body`, and SwiftUI draws an invalidation boundary around it: "when my inputs
change, re-run *this* body."

## Why computed properties change nothing

```swift
struct ProfileView: View {
    @State private var isExpanded = false
    let name: String

    var body: some View {
        VStack {
            header
            details
        }
    }

    private var header: some View { Text(name).font(.title) }
    private var details: some View { /* ...expensive... */ }
}
```

`header` and `details` look like sub-views, but they aren't. They're just
functions that get called *inside* `ProfileView.body`. They live within the
same invalidation boundary. So when `isExpanded` flips, `body` re-runs — and
that re-runs `header` **and** `details`, every time, even though `header`
only depends on `name`, which didn't change.

Splitting into computed properties is a readability tool. It is not a
performance tool.

## What a real View struct buys you

```swift
var body: some View {
    VStack {
        ProfileHeader(name: name)
        ProfileDetails(isExpanded: isExpanded)
    }
}
```

Now `ProfileHeader` and `ProfileDetails` are their own structs, each with its
own boundary. SwiftUI compares the inputs it passed in: when `isExpanded`
changes, `ProfileHeader`'s only input (`name`) is unchanged, so SwiftUI can
skip re-evaluating its body entirely. Only `ProfileDetails` re-runs.

The boundary moved. That's the whole difference: a computed property shares
the parent's boundary; a struct creates a new one.

## The senior caveat: don't cargo-cult it

Re-evaluating a `body` is not the same as re-rendering pixels, and for cheap
views it costs almost nothing. Extracting every subview "for performance" adds
its own noise and can hurt readability for zero benefit.

The rule I actually apply:

- Split into computed properties freely — for **readability**.
- Extract into a **`View` struct** when a subtree is *expensive* and its inputs
  change on a *different* cadence than its siblings.
- Then **measure**, don't guess. `Self._printChanges()` inside a body prints
  exactly what caused each re-evaluation; Instruments' SwiftUI template shows
  the cost.

Know the boundary, and you stop optimizing by superstition.
