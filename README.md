# DersMD

Açık kaynak **eğitim player**: JSON müfredat + etkileşimli ders/quiz. Öğretmen içerik yazar, öğrenci tarayıcıda pratik yapar.

## Neden bu proje?

Claude for Open Source / genel OSS uygunluğu için “boş demo” değil, **başkalarının katkı verebileceği bir eğitim aracı** hedefler:

- Kurslar `content/courses/*.json` — içerik PR’ı kolay
- Player Next.js ile genişletilebilir (Markdown, spaced repetition, öğretmen paneli)
- Örnek müfredat: Python başlangıç + İngilizce A1

## Çalıştırma

```bash
npm install
npm run dev -- --port 43127
```

Tarayıcı: [http://127.0.0.1:43127](http://127.0.0.1:43127)

## Yeni kurs eklemek

1. `content/courses/benim-kursum.json` oluştur  
2. Şema: `id`, `title`, `level`, `minutes`, `summary`, `audience`, `lessons[]`  
3. Her derste `body` (paragraflar) + `quiz` (`prompt`, `choices`, `answerIndex`, `explain`)  
4. `src/lib/courses.ts` içine import et

## OSS yol haritası (uygunluk için)

1. Gerçek öğretmen/öğrenciye kullandır  
2. Issue aç / PR kabul et  
3. İsteğe bağlı: `@dersmd/schema` npm paketi ayır  
4. Aktif bakımı 3+ ay sürdür, sonra Claude for OSS’e başvur

## Lisans

MIT
