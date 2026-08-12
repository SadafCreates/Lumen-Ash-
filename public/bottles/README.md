# Bottle photography

Drop your cut-out bottle photos here, then point each edition at its file
in `src/components/Editions.jsx` (the `image` field).

## Guidelines

- **Transparent background** (PNG or WEBP) — no background to composite.
- **Tall aspect ratio**, bottle roughly centred and upright — e.g. 1200×1600px.
- Keep file sizes reasonable (compress with something like squoosh.app);
  large uncompressed photos will slow the page down.

## Wiring a photo in

```js
// src/components/Editions.jsx
{
  key: 'ash',
  name: 'Ash Édition',
  ...
  image: '/bottles/ash-edition.png',
}
```

That's it — `PerfumeSpinner` picks it up automatically and puts it on the
360° turntable. Until an image is set, the illustrated SVG bottle is shown
instead, so nothing breaks.
