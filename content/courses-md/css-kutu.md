---
id: css-kutu
title: "CSS: Kutu Modeli"
level: Başlangıç
minutes: 16
summary: Margin, border, padding ve content ilişkisini öğren.
audience: Frontend öğrencileri
---

## Ders: kutu-nedir
minutes: 5

Her HTML öğesi bir kutu gibi düşünülür: içerik, padding, border, margin.

Dıştan içe: margin → border → padding → content.

### Quiz
Soru: Öğenin dış boşluğu hangisidir?
- [ ] padding
- [x] margin
- [ ] border
- [ ] content
Açıklama: margin kutunun dışındaki boşluktur.

## Ders: padding-border
minutes: 6

padding, içerik ile kenarlık arasındaki iç boşluktur.

border kutuyu çevreleyen çizgidir.

### Quiz
Soru: İçerik ile border arasındaki boşluk?
- [x] padding
- [ ] margin
- [ ] outline
- [ ] gap
Açıklama: padding iç boşluktur.

## Ders: box-sizing
minutes: 5

box-sizing: border-box ile width padding+border dahil hesaplanır.

Çoğu modern reset bunu kullanır.

### Quiz
Soru: border-box ne sağlar?
- [ ] Margin'i yok eder
- [x] width içine padding ve border katılır
- [ ] Sadece font büyütür
- [ ] Flex zorunlu kılar
Açıklama: border-box genişlik hesabını kolaylaştırır.
