# incandescent.church

The website of the Church of the Incandescent Filaments.

## Layout

- `Church of the Incandescent Filaments/` holds the source documents (the catechism, its companions, and `Style of the Faith.xlsx`). They are reference material only and are deliberately not published: they contain names, places, and other personal detail.
- `docs/` is the published site. Plain HTML, CSS, and JS with no build step.
  - `index.html`, `style.css`, `script.js`: the single page. Its text is a synthesis of the faith written for the site, free of the personal detail in the sources.
  - `tokens.css`: the Style of the Faith design tokens (colors, fonts), copied from the `style-of-the-faith` skill. `style.css` only references these.
  - `CNAME`: the custom domain for GitHub Pages.

## Preview locally

```sh
python3 -m http.server -d docs 8000
```

If the palette changes, update `docs/tokens.css` and the `palette` array in `docs/script.js`.

## Deployment

GitHub Pages, served from `docs/` on `main`. Free, with HTTPS, and every push to `main` publishes.

One-time setup:

```sh
gh repo create lordjabez/incandescent-church --public --source . --push
gh api -X POST repos/lordjabez/incandescent-church/pages -f 'source[branch]=main' -f 'source[path]=/docs'
```

Then in GoDaddy DNS for `incandescent.church`, remove the parked `A` records and add:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | lordjabez.github.io |

Once DNS resolves, tick "Enforce HTTPS" under the repo's Settings > Pages.
