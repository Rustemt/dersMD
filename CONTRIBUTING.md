# Katkı

1. Issue aç veya mevcut görevi seç.
2. `content/` altına JSON / Markdown eklemek en kolay PR’dır.
3. Yeni modül için `src/app/<ad>/` + `src/lib/modules.ts` güncelle.
4. `npm run build && npm test && npm run validate:courses` geçsin.
5. Kısa PR açıklaması yaz.

## Good first issues

- Yeni `content/courses/*.json` veya `content/courses-md/*.md` kursu
- `content/questions/` soru bankası
- `content/flashcards/` deste
- README / docs çevirisi veya örnek ekran görüntüsü

## API

- `GET /api/courses` — kurs listesi
- `GET /api/courses/:id` — tam kurs
- Sınıf quiz odaları SQLite (`data/dersmd.sqlite`) ile kalıcıdır (tek süreç).
