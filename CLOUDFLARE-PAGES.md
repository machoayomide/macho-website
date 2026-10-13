# MACHO STUDIO · Cloudflare Pages

This branch is the Git-managed deployment source for Macho Studio. **The original website remains unchanged on `main`.**

## Deployment directories

- `sites/main/` — Macho Studio portfolio, deployed as an independent Cloudflare Pages project.
- `sites/shopify/` — Shopify specialist website, deployed as a second Cloudflare Pages project.
- Other specialist sites can be added as additional projects/repos later. Cloudflare currently supports up to five Pages projects per repository by default.

## Cloudflare Pages configuration

Create two new **Git-connected** Pages projects, both linked to `machoayomide/macho-website` and branch `cloudflare-pages`:

| Site | Pages project name | Root directory | Build command | Build output directory |
|---|---|---|---|---|
| Main | `macho-studio-git` | `/` | `exit 0` | `sites/main` |
| Shopify | `macho-shopify-git` | `/` | `exit 0` | `sites/shopify` |

Use framework preset **None**, and configure each Pages project’s production branch to `cloudflare-pages`.

**Important:** `macho-studio-main.pages.dev` was created via Direct Upload. Cloudflare does not allow adding native Git integration to an existing Direct Upload project. Keep that site as-is and create the new Git-integrated Pages projects separately; attach custom domains only after verifying them.

## Deployment approach

Push static site contents into `sites/main` and `sites/shopify`. A push to `cloudflare-pages` will trigger Cloudflare Pages rebuilds once the new projects are connected.

All media files belong in the matching site's `assets` directory. Do not commit passwords, API tokens, WordPress configuration or private client data.

## Contact

Public email: machomanexpert@gmail.com
WhatsApp: https://wa.me/2349160956794

## Future WordPress migration

This branch keeps static assets and page markup versioned, which can later be converted into WordPress templates, while keeping domain and design intact.
