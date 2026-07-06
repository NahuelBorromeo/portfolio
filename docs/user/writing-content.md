# Writing content

Guía para Nahuel: cómo añadir posts, series y secciones nuevas. Todo el
contenido del sitio va **en inglés**.

## Añadir un post al blog

Crea un archivo markdown en `src/content/blog/`, por ejemplo
`src/content/blog/memory-management-arc.md`:

```markdown
---
title: "Understanding ARC in Swift"
description: "One-sentence summary shown in cards and search results."
pubDate: 2026-07-20
series: "Become a better iOS engineer"   # opcional
order: 3                                  # opcional: posición en la serie
tags: ["swift", "memory"]                 # opcional
draft: false                              # true = no se publica
---

Post content in markdown...
```

Haz push y ya está publicado. Nada más que tocar.

- **Borrador:** `draft: true` lo oculta del sitio, RSS y sitemap.
- **Serie nueva:** simplemente usa un nombre nuevo en `series:` — la agrupación
  en `/blog` es automática, no hay que registrar la serie en ningún lado.

## Añadir una sección/pestaña nueva (ej. "Projects")

1. Crea la página: `src/pages/projects.astro` (usa `BaseLayout`).
2. Añade la entrada al array de links en `src/components/Nav.astro`.

Eso es todo — dos archivos. Si la sección tiene items repetitivos (proyectos,
charlas), crea además una content collection en `src/content.config.ts`
copiando el patrón de `blog`, y guarda cada item como markdown en
`src/content/<colección>/`.

## Reglas de contenido

- El cliente de NTT Data nunca se nombra ("a large-scale banking application").
- MODO / BBVA Argentina sí se puede nombrar.
- Los datos de experiencia viven en `docs/knowledge/content.md` — si algo
  cambia (nuevo rol, nueva fase lanzada), actualiza ese archivo primero y luego
  los componentes que lo usan.
