# DersMD

Açık kaynak **eğitim araç seti** (MIT). JSON içerik + Next.js arayüz.

## Modüller

| Modül | Rota | Ne işe yarar |
| --- | --- | --- |
| Ders player | `/kurs/...` | JSON müfredat + quiz |
| Tekrar motoru | `/tekrar` | Flashcard + SM-2 lite |
| Soru bankası | `/soru-bankasi` | Yanlışları tekrar kuyruğu |
| Pomodoro + hedef | `/pomodoro` | Zamanlayıcı, hedef, streak |
| Sesli okuma / dikte | `/dikte` | Dinle–yaz (Web Speech) |
| Sınıf quiz | `/sinif-quiz` | Oda kodu ile canlı quiz |
| Ödev toplayıcı | `/odev` | Teslim + kontrol listesi |
| Rubrik puanlayıcı | `/rubrik` | Kriter notu + yazdır |
| LGS–YKS haritası | `/konu-haritasi` | Konu ağacı |
| Markdown defter | `/defter` | MD → HTML önizleme |
| Açık ders paketi | `/paket` | `ders.json` doğrulayıcı |

## Kurulum

```bash
npm install
npm run dev
```

Varsayılan adres: [http://127.0.0.1:43127](http://127.0.0.1:43127)

## İçerik ekleme

- Kurslar: `content/courses/*.json` → `src/lib/courses.ts` import
- Kartlar: `content/flashcards/`
- Sorular: `content/questions/`
- Konu haritası: `content/topics/`
- Şema: `content/SCHEMA.md`

## GitHub’a yükleme

1. GitHub’da yeni boş repo oluştur (README ekleme).
2. Yerelde:

```bash
git remote add github https://github.com/KULLANICI/REPO.git
git push -u github main
```

Cursor’da **Create repo** ile de bağlayabilirsin; ardından aynı `main` dalını GitHub’a push et.

## Lisans

MIT — ayrıntı `LICENSE`.
