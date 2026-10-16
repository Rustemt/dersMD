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
