# Registry of Shielded Artworks (Static Site)

A multi-page static marketing site derived from `Art market thesis.md`.

## Stack

- Semantic HTML
- Single shared stylesheet: `styles/main.css`
- Vanilla JavaScript ES modules:
  - `scripts/components.js` (web components)
  - `scripts/site.js` (small page behaviors)
- Local SVG diagrams in `assets/`

No frameworks, no npm dependencies, no external fonts, no third-party analytics.

## Structure

- `index.html` home portal
- `thesis/index.html` thesis rendering
- `rsa/index.html` RSA product page
- `alma/index.html` ALMA governance page
- `architecture/index.html` system narrative + slider
- `use-cases/index.html` audience panels
- `blog/index.html` post index
- `blog/*.html` six full posts
- `verify/index.html` placeholder verification UI
- `robots.txt`, `sitemap.xml`, `feed.xml`

## Shared Components

`components.js` defines:

- `<site-header current="..."></site-header>`
- `<site-footer></site-footer>`
- `<callout-card title="..." tone="neutral|warning|positive"></callout-card>`

Use `root="./"` on root pages and `root="../"` on one-level nested pages.

## Running Locally

You can use any static server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

You can also open files directly in a browser; links are relative.

## Notes

- Verify page is intentionally non-functional and includes explicit warning copy.
- Site content is a marketing-friendly rendering; authoritative terminology and claims remain in `Art market thesis.md`.
