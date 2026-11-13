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

## Publish / push status — blocked on git auth
Repo exists: https://github.com/somospurospatosfeos/lumar-velas (private).  
Local remote is set to that URL; files committed on `main` (`index.html`, `styles.css`, `app.js`, `lumar-shop-handoff.md`).  
Push fails: this VM has no GitHub HTTPS credentials / `gh` login, and the host SSH key is not authorized on the repo.

**Unblock (pick one):**
1. Add this deploy key (write) on the repo → Settings → Deploy keys, then ask the agent to push again:
   `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPqiJsBjAsv4KymedFcUR891X1lgC90DW8yMtjcHJ/p0`
2. Or relaunch a Cloud Agent **from** `somospurospatosfeos/lumar-velas` so Cursor injects git tokens.
3. Or authenticate `gh` / provide a PAT with `contents:write` for that repo (not in chat if avoidable).

Then `publish-app` with `project_dir=.`, `suggested_slug=lumar-velas`, and a live `preview_url`.

## Evidence
- Manual test: `/cursor/stores/bc-c13025f0-45fb-4f4b-98f1-feea71daf14d/internal/manual-test-report.md`
- Artifacts: hero/cart/checkout screenshots + `lumar_shop_cart_checkout_demo.mp4` under `/cursor/stores/bc-c13025f0-45fb-4f4b-98f1-feea71daf14d/artifacts/`
- Media gallery: `/cursor/stores/bc-c13025f0-45fb-4f4b-98f1-feea71daf14d/media/`
