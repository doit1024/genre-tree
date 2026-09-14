# 曲风分支 / Genre Tree

Display-only explorer for style variants of a public-domain melody. Click a branch, play it, compare it with its parent. **No music generation API** — audio is static files.

只做展示：分支树 + HTML5 播放 + 父/子对照 + 静态曲风卡片。生成音频不在本仓库范围内。

## Run / 运行

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Seed demo: **小星星 / Twinkle Twinkle Little Star** — 1 root + 3 style children.

```bash
npm run build   # production check
```

## Drop in real audio later / 之后替换正式音频

1. Put `mp3` / `wav` files under `public/audio/`.
2. Point each node’s `audioPath` in `data/tree.json` at that file (example: `"/audio/twinkle-jazz.mp3"`).
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

Tracks Linear **ZHA-5**.
