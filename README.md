# Bayesian SSH documentation

Source of **[bssh.abdoufermat.dev](https://bssh.abdoufermat.dev)**: the Bayesian SSH and
bssh Teams documentation, in English, French, Spanish and Simplified Chinese. Built with
[Astro Starlight](https://starlight.astro.build). The code lives in
[bayesian-ssh](https://github.com/abdoufermat5/bayesian-ssh).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/; fails on broken internal links
```

Node 24 (see `.nvmrc`; Astro needs ≥ 22.23.4).

## Deploying

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds every pull request and
deploys `main` to GitHub Pages. It also runs daily at 04:17 UTC and on demand
(`gh workflow run Docs`), so the installer below follows new releases.

How the site is set up:

| Piece | Setting |
|---|---|
| Pages | Source: *GitHub Actions*; custom domain `bssh.abdoufermat.dev`, HTTPS enforced (Let's Encrypt, renewed by GitHub) |
| `DOCS_SITE` | Repository variable, `https://bssh.abdoufermat.dev`: canonical URLs, the sitemap and the `CNAME`. Without it the build falls back to `http://localhost:4321` |
| DNS | Cloudflare `CNAME bssh → abdoufermat5.github.io`, **DNS only**: proxying it would stop GitHub from issuing the certificate |

To host elsewhere, run `DOCS_SITE=https://docs.example.com npm run build` and serve `dist/` as
static files.

## The installer

`curl -fsSL https://bssh.abdoufermat.dev/install.sh | bash` is served from here, but the script
is `install.sh` in bayesian-ssh: never edit a copy in this repository. At each deploy the
workflow takes the latest release's `install.sh` asset, checks the cosign signature of the
release's `SHA256SUMS` and the file's checksum, and publishes it as `dist/install.sh`.
Releases from before 2.10.2 have no such asset; for those it takes the script at the release
tag.

After a bayesian-ssh release, the URL serves the new installer at the next daily run, or right
away with `gh workflow run Docs -R abdoufermat5/bssh-docs`.

## Writing

Read [CONTRIBUTING.md](CONTRIBUTING.md): voice, page anatomy, translation rules and the glossary.
