# DersMD

Açık kaynak **eğitim araç seti** (MIT) — [github.com/Rustemt/dersMD](https://github.com/Rustemt/dersMD)

[![npm schema](https://img.shields.io/npm/v/@dersmd/schema.svg)](https://www.npmjs.com/package/@dersmd/schema)
[![npm sm2](https://img.shields.io/npm/v/@dersmd/sm2.svg)](https://www.npmjs.com/package/@dersmd/sm2)
[![npm cli](https://img.shields.io/npm/v/@dersmd/cli.svg)](https://www.npmjs.com/package/@dersmd/cli)

JSON / Markdown müfredat, quiz, tekrar motoru, canlı sınıf, ödev, rubrik ve daha fazlası.

## Hızlı bakış

| Modül | Rota |
| --- | --- |
| Ders player | `/kurs/...` |
| Tekrar (SM-2) | `/tekrar` |
| Soru bankası | `/soru-bankasi` |
| Pomodoro | `/pomodoro` |
| Dikte | `/dikte` |
| Sınıf quiz (SQLite) | `/sinif-quiz` |
| Ödev | `/odev` |
| Rubrik | `/rubrik` |
| LGS–YKS haritası | `/konu-haritasi` |
| Markdown defter | `/defter` |
| Paket doğrulayıcı | `/paket` |

## Kurulum

```bash
npm install
npm run dev
```

Adres: http://127.0.0.1:43127

## İçerik

- JSON kurslar: `content/courses/`
- **Markdown kurslar:** `content/courses-md/` (ör. `css-kutu.md`)
- Kartlar: `content/flashcards/`
- Sorular: `content/questions/`
- Şema: `content/SCHEMA.md`

## Paketler

| Paket | Görev |
| --- | --- |
| `@dersmd/schema` | `ders.json` doğrula |
| `@dersmd/sm2` | Spaced repetition |
| `@dersmd/cli` | `npx` ile validate |

Yayın adımları: `docs/NPM_PUBLISH.md`

```bash
npm run build:packages
node packages/cli/dist/cli.js content/courses/python-ilk-adim.json
```

## VS Code eklentisi

`extensions/dersmd-vscode` — komut: **DersMD: Paketi Doğrula** + JSON şema.

```bash
cd extensions/dersmd-vscode && npm i && npm run compile
```

## Katkı / OSS

- `CONTRIBUTING.md`
- Yol haritası: `docs/OSS_ROADMAP.md`
- Yazı taslağı: `docs/DEVTO_DRAFT.md`
- Topics: `docs/GITHUB_TOPICS.md`

```bash
npm run validate:courses
npm test
```

## HTTP API

- `GET /api/courses`
- `GET /api/courses/:id`
- Sınıf quiz: `/api/rooms`

İlerleme yedekleme: `/ilerleme` · kurs Markdown indirme: kurs sayfasında.

## Lisans

MIT
