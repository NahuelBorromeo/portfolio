# Getting started

Guía para Nahuel: cómo correr y desplegar tu propio sitio.

## Correr en local

```bash
npm install
npm run dev       # http://localhost:4321
```

## Verificar antes de publicar

```bash
npm run build     # build de producción; debe pasar sin errores
npm run preview   # sirve el build localmente
```

## Publicar

Todo push a `main` en GitHub despliega automáticamente a producción en Vercel.
Los pushes a otras branches generan una URL de preview.

```bash
git add -A && git commit -m "Add new post" && git push
```

## Actualizar el CV descargable

Reemplaza `public/cv.pdf` con el nuevo PDF y haz push. Mantén el mismo nombre
de archivo para no romper links ya compartidos.

## Cambiar la foto

La foto del hero vive en `src/assets/`. Reemplázala por una nueva (idealmente
la misma de LinkedIn) y haz push; Astro la re-optimiza en el build.
