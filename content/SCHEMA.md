# DersMD kurs şeması

```json
{
  "id": "benzersiz-slug",
  "title": "Kurs başlığı",
  "level": "Başlangıç",
  "minutes": 20,
  "summary": "Tek cümle özet",
  "audience": "Kimler için",
  "lessons": [
    {
      "id": "ders-slug",
      "title": "Ders başlığı",
      "minutes": 7,
      "body": ["Paragraf 1", "Paragraf 2"],
      "quiz": {
        "prompt": "Soru?",
        "choices": ["A", "B", "C", "D"],
        "answerIndex": 1,
        "explain": "Neden doğru?"
      }
    }
  ]
}
```

`answerIndex` 0 tabanlıdır (ilk şık = 0).

## Markdown kurs (`content/courses-md/*.md`)

```md
---
id: ornek
title: Örnek
level: Başlangıç
minutes: 10
summary: Kısa özet
audience: Herkes
---

## Ders: ilk-ders
minutes: 5

Paragraf bir.
Paragraf iki.

### Quiz
Soru: 2+2?
- [ ] 3
- [x] 4
- [ ] 5
Açıklama: 4 doğru.
```
