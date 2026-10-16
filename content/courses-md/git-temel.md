---
id: git-temel
title: "Git'e İlk Adım"
level: Başlangıç
minutes: 18
summary: commit, branch ve push ile temel iş akışı.
audience: Yazılım öğrencileri
---

## Ders: commit
minutes: 6

commit, projenin bir anlık kaydıdır.

Anlamlı mesaj yaz: "fix login bug" gibi.

### Quiz
Soru: Değişiklikleri kaydetmek için temel komut?
- [ ] git push
- [x] git commit
- [ ] git clone
- [ ] git fork
Açıklama: commit yerel geçmişe kayıt ekler.

## Ders: branch
minutes: 6

branch, paralel çalışma çizgisidir.

main'i bozmadan özellik dalı açabilirsin.

### Quiz
Soru: Yeni dal oluşturmak için?
- [ ] git push -u
- [ ] git status
- [x] git branch / git switch -c
- [ ] git blame
Açıklama: branch veya switch -c ile yeni dal açılır.

## Ders: push
minutes: 6

push, yerel commit'leri uzak repoya gönderir.

İlk seferde -u origin main sık kullanılır.

### Quiz
Soru: Uzak repoya gönderme komutu?
- [x] git push
- [ ] git pull only
- [ ] git stash
- [ ] git init
Açıklama: push uzak sunucuyu günceller.
