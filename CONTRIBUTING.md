# Writing the Bayesian SSH docs

The site is [Astro Starlight](https://starlight.astro.build) in four languages. English is the
source of truth; French, Spanish and Simplified Chinese mirror it page for page.

## Layout

```
src/content/docs/
  index.mdx                 English landing page
  start/ guides/ teams/ reference/
  fr/  es/  zh-cn/          same tree, same file names, translated
src/assets/screenshots/     desktop app screenshots
astro.config.mjs            sidebar (group labels translated there; page labels come from each page's title)
```

A page that exists in English but not yet in a language falls back to English with a notice.
Every page is `.mdx`, even without components, so translations keep the same file name.

## Voice

- Simple, calm, exact. Short sentences. One idea per paragraph.
- Second person, present tense, active voice: "Run `bssh teams sync`", not "The user should run".
- Say what something does and when to use it. No marketing words (powerful, seamless, blazing,
  effortless, revolutionary), no exclamation marks, no emojis.
- Lead with the task. Background goes after the command, and only if it changes what the reader does.
- French uses *vous*. Spanish uses *tú*. Chinese uses *你*, full-width punctuation in prose, and a
  space between Chinese and Latin text or numbers (`使用 bssh 连接`, `3 个席位`).

## Facts

- Every command, flag, default and message must match the shipped CLI. Check `bssh <command> --help`
  and the source in `bayesian-ssh/crates/cli`; the desktop app is `bayesian-ssh/desktop/src`. The old
  mdBook pages in `bayesian-ssh/docs/src` are hints only: some flags there no longer exist.
- Never invent prices, URLs, limits or behavior. Teams pricing is described by its model only
  (3 free seats per team, then per-seat billing, monthly or yearly); no amounts.
- Example hosts use `example.com` (`web-prod.example.com`, `teams.example.com`), private IPs
  (`10.0.4.12`) and neutral names (`web-prod`, `db-prod`, `platform`, `ana@example.com`).
- Use `bssh`, never `bayesian-ssh`, in commands (both names are installed).

## Page anatomy

```mdx
---
title: Bastion hosts            # sentence case, short; becomes the sidebar label
description: One sentence for search results and link previews.
---

import { Steps, Tabs, TabItem, CardGrid, LinkCard } from '@astrojs/starlight/components';

One or two sentences: what this is and when you need it.

## A task, phrased as one
```

- Headings: `##` and `###` only, sentence case, no trailing punctuation, no numbering.
- Commands in ` ```sh ` blocks without a `$` prompt. Explain with a trailing `# comment` only when
  the line isn't obvious. Show output only when the reader needs to recognize it, in a separate
  ` ```text ` block, copied from a real run.
- Procedures with three or more ordered steps use `<Steps>` wrapping an ordered list.
- Alternatives (per OS, CLI vs desktop) use `<Tabs syncKey="...">`. Use `syncKey="os"` for operating
  systems and `syncKey="surface"` for *Command line* / *Desktop app*.
- Callouts use directives, sparingly (at most two per page): `:::note`, `:::tip`, `:::caution`
  (data loss or security), `:::danger` (irreversible).
- Tables for options and comparisons. List only the flags that matter for the task and link to
  [the command reference](/reference/cli/) for the rest.
- Desktop UI labels are written exactly as the app shows them, in bold: **Share with a team…**.
  The app is in English, so labels stay in English in every language. Keys use `<kbd>`: <kbd>Ctrl</kbd>+<kbd>K</kbd>.
- Screenshots: markdown image syntax with a relative path and real alt text.
  English pages: `![Alt](../../../assets/screenshots/app-hosts.png)`;
  translated pages are one level deeper: `../../../../assets/screenshots/...`.
- End a page with a short *Next steps* / related section only when there is an obvious next page.

## Links

- Internal links are absolute, with a trailing slash: `/guides/bastions/`. In a translation, prefix
  the locale: `/fr/guides/bastions/`, `/es/guides/bastions/`, `/zh-cn/guides/bastions/`.
- Anchors use the heading slug of the same language.
- External links: GitHub repository `https://github.com/abdoufermat5/bayesian-ssh`, issues
  `https://github.com/abdoufermat5/bayesian-ssh/issues`, releases
  `https://github.com/abdoufermat5/bayesian-ssh/releases`.

## Translating

- Translate meaning, not words. Keep the same headings, order, code blocks, tables, components and
  links as the English page; a translated page must never add or drop information.
- Never translate: product names (Bayesian SSH, bssh, bssh Teams), commands, flags, file paths,
  environment variables, code, output, and desktop UI labels.
- Translate `# comments` inside code blocks, image alt text, `title`, `description`, tab labels and
  card text.
- Keep the frontmatter keys in English.

## Glossary

Use these terms everywhere. Add a row before introducing a new recurring term.

| English | Français | Español | 简体中文 |
| --- | --- | --- | --- |
| connection (saved host entry) | connexion | conexión | 连接 |
| host | hôte | host | 主机 |
| bastion / jump host | bastion / hôte de rebond | bastión / host de salto | 跳板机 |
| interactive bastion | bastion interactif | bastión interactivo | 交互式堡垒机 |
| tag | tag | etiqueta | 标签 |
| alias | alias | alias | 别名 |
| environment (profile) | environnement | entorno | 环境 |
| inventory source | source d'inventaire | fuente de inventario | 清单源 |
| fuzzy matching | recherche approximative | búsqueda aproximada | 模糊匹配 |
| ranking | classement | clasificación | 排序 |
| session | session | sesión | 会话 |
| session recording | enregistrement de session | grabación de sesión | 会话录制 |
| replay | rejouer | reproducir | 回放 |
| tunnel | tunnel | túnel | 隧道 |
| port forwarding | redirection de port | reenvío de puertos | 端口转发 |
| SOCKS proxy | proxy SOCKS | proxy SOCKS | SOCKS 代理 |
| key (SSH) | clé | clave | 密钥 |
| desktop app | application de bureau | aplicación de escritorio | 桌面应用 |
| command palette | palette de commandes | paleta de comandos | 命令面板 |
| team | équipe | equipo | 团队 |
| vault | coffre | bóveda | 保险库 |
| member | membre | miembro | 成员 |
| admin | administrateur | administrador | 管理员 |
| seat | siège | puesto | 席位 |
| invite | invitation | invitación | 邀请 |
| device | appareil | dispositivo | 设备 |
| fingerprint | empreinte | huella | 指纹 |
| passphrase | phrase secrète | frase de contraseña | 口令 |
| grant the key | accorder la clé | conceder la clave | 授予密钥 |
| team key | clé d'équipe | clave del equipo | 团队密钥 |
| key rotation | rotation de clé | rotación de clave | 密钥轮换 |
| sync | synchroniser / synchronisation | sincronizar / sincronización | 同步 |
| sync server | serveur de synchronisation | servidor de sincronización | 同步服务器 |
| audit log | journal d'audit | registro de auditoría | 审计日志 |
| end-to-end encrypted | chiffré de bout en bout | cifrado de extremo a extremo | 端到端加密 |
| read-only | lecture seule | solo lectura | 只读 |
| subscription | abonnement | suscripción | 订阅 |
| self-hosting | auto-hébergement | autoalojamiento | 自托管 |
| operator (of a server) | opérateur | operador | 运维方 |

## Running the site

Node 24 (`.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/, with the search index
```

Set `DOCS_SITE` to the public URL when building for production (`DOCS_SITE=https://docs.example.com npm run build`).
