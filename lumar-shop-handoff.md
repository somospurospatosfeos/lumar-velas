---
cursor:
  subagentId: "bc-9b2ac4df-a30a-5a99-bac4-141a6f6073b5"
---

# LUMAR Velas shop — handoff

## Deliverable
Static storefront at workspace root:

- `/agent/index.html`
- `/agent/styles.css`
- `/agent/app.js`

Branch (local only): `cursor/lumar-velas-granada-73b5`  
Commits: site scaffold + hero brand hierarchy fix.  
Remote: only a local bare repo at `/tmp/lumar-origin.git` (no GitHub remote).

## Features shipped
- 8 aromatic candles (ES-ES, €), collections Relajación/Energía/Románticas/Hogar, badges Más vendido/Nuevo
- Side cart, 3x2 combo discount, filters + search, product modal + reviews
- Crea tu vela, Gift Box, Spain checkout (Granada default, Bizum/Tarjeta/PayPal/Transferencia, shipping zones)
- Hero, bestsellers, why LUMAR, testimonials, FAQ, Instagram grid, footer legal (RGPD), WhatsApp float, email 10% popup

## Local preview
`python3 -m http.server 8765 --bind 127.0.0.1` in `/agent` → http://127.0.0.1:8765/

## Publish status — blocked
`publish-app` refused: this cloud run has **no linked Origin/GitHub repository** (`repoUrl: null`). Also no `gh` credentials to create/push a new GitHub repo from the VM.

**Unblock:** attach a GitHub/Origin repo to the environment (or create `lumar-velas` under the connected GitHub account, push this branch, relaunch a run on that repo), then call `publish-app` again with `project_dir=.`, `suggested_slug=lumar-velas`, and a live `preview_url`.

## Evidence
- Manual test: `/cursor/stores/bc-c13025f0-45fb-4f4b-98f1-feea71daf14d/internal/manual-test-report.md`
- Artifacts: hero/cart/checkout screenshots + `lumar_shop_cart_checkout_demo.mp4` under `/cursor/stores/bc-c13025f0-45fb-4f4b-98f1-feea71daf14d/artifacts/`
- Media gallery: `/cursor/stores/bc-c13025f0-45fb-4f4b-98f1-feea71daf14d/media/`
