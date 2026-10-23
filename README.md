# Bayesian SSH documentation

Source of the Bayesian SSH and bssh Teams documentation, in English, French, Spanish and
Simplified Chinese. Built with [Astro Starlight](https://starlight.astro.build).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/; fails on broken internal links
```

Node 24 (see `.nvmrc`; Astro needs ≥ 22.23.4).

## Deploying

`.github/workflows/deploy.yml` builds every pull request and deploys `main` to GitHub Pages.

1. In the repository settings, set **Pages → Source** to *GitHub Actions*.
2. Add the repository variable `DOCS_SITE` with the public URL, e.g. `https://docs.example.com`.
   The build uses it for canonical URLs and the sitemap, and writes the matching `CNAME`.
3. Point the domain's DNS at GitHub Pages (a `CNAME` record to `<owner>.github.io`).

To host elsewhere, run `DOCS_SITE=https://docs.example.com npm run build` and serve `dist/` as
static files.

## Writing

Read [CONTRIBUTING.md](CONTRIBUTING.md): voice, page anatomy, translation rules and the glossary.
