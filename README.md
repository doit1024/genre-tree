# 曲风分支 / Genre Tree

Display-only explorer for style variants of a public-domain melody. Click a branch, play it, compare it with its parent. **No music generation API** — audio is static files.

只做展示：分支树 + HTML5 播放 + 父/子对照 + 静态曲风卡片。生成音频不在本仓库范围内。

Production: [https://www.doooit.me/genre-tree](https://www.doooit.me/genre-tree)

The app is mounted at **`/genre-tree`** (`basePath` + `assetPrefix`). Keep `audioPath` in `data/tree.json` as a site-root path such as `/audio/twinkle-jazz.wav`; the player prefixes the base path.

## Run / 运行

```bash
npm install
npm run dev
```

Open [http://localhost:3000/genre-tree](http://localhost:3000/genre-tree) — not `/`. Seed demo: **小星星 / Twinkle Twinkle Little Star** — 1 root + 3 style children.

```bash
npm run build     # Next.js production check
npm run preview   # OpenNext + Wrangler local Workers runtime
```

## Deploy / 部署

Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (App Router, not Pages `next-on-pages`).

```bash
npm install
npm run deploy
```

That builds with OpenNext and runs `wrangler` using `wrangler.jsonc`. The worker name is `genre-tree`. A route is declared for `www.doooit.me/genre-tree*` on zone `doooit.me`.

First-time notes:

1. `npx wrangler login` (or set `CLOUDFLARE_API_TOKEN`) if this machine is not already authenticated.
2. If the custom route fails (zone / permission), the worker still publishes to `*.workers.dev`. Attach `www.doooit.me/genre-tree*` in the Cloudflare dashboard afterward — more specific than the existing `doit-blog` host.
3. `npm run upload` uploads a new version without changing production traffic.

## Drop in real audio later / 之后替换正式音频

1. Put `mp3` / `wav` files under `public/audio/`.
2. Point each node’s `audioPath` in `data/tree.json` at that file (example: `"/audio/twinkle-jazz.mp3"`). Do **not** bake `/genre-tree` into the JSON.
3. Keep the node shape: `id`, `parentId`, `title`, `style`, `audioPath`, `card { style, instruments[], notableArtists[], albums[] }`.

Placeholder tones (so `npm run dev` works today) live at:

- `public/audio/twinkle-root.wav`
- `public/audio/twinkle-jazz.wav`
- `public/audio/twinkle-lofi.wav`
- `public/audio/twinkle-chamber.wav`

Regenerate placeholders only if needed:

```bash
npm run audio:placeholders
```

Happy Birthday and other stems are out of this scaffold — add more nodes in `data/tree.json` the same way.

## Out of scope / 不在范围内

- Music generation APIs, upload-to-generate, auth, payments
- React Flow (this UI is a small custom tree)

Tracks Linear **ZHA-5** (scaffold) and **ZHA-8** (Cloudflare + base path).
