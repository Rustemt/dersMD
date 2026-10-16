export type EduModule = {
  id: string;
  href: string;
  title: string;
  blurb: string;
  audience: string;
};

export const EDU_MODULES: EduModule[] = [
  {
    id: "kurslar",
    href: "/#kurslar",
    title: "Ders player",
    blurb: "JSON müfredat + quiz ile adım adım ders.",
    audience: "Öğrenci / öğretmen",
  },
  {
    id: "tekrar",
    href: "/tekrar",
    title: "Tekrar motoru",
    blurb: "Flashcard + spaced repetition (SM-2 lite).",
    audience: "Öğrenci",
  },
  {
    id: "soru-bankasi",
    href: "/soru-bankasi",
    title: "Soru bankası",
    blurb: "Konuya göre test; yanlışlar tekrar kuyruğuna düşer.",
    audience: "Öğrenci",
  },
  {
    id: "pomodoro",
    href: "/pomodoro",
    title: "Pomodoro + hedef",
    blurb: "Çalışma zamanlayıcı, günlük hedef ve streak.",
    audience: "Öğrenci",
  },
  {
    id: "dikte",
    href: "/dikte",
    title: "Sesli okuma / dikte",
    blurb: "Metni dinle, yaz; Web Speech API ile kontrol.",
    audience: "Dil / ilkokul",
  },
  {
    id: "sinif-quiz",
    href: "/sinif-quiz",
    title: "Sınıf quiz paneli",
    blurb: "Oda kodu ile canlı soru; öğretmen + öğrenci.",
    audience: "Öğretmen",
  },
  {
    id: "odev",
    href: "/odev",
    title: "Ödev toplayıcı",
    blurb: "Teslim formu + kontrol listesi (yerel arşiv).",
    audience: "Öğretmen",
  },
  {
    id: "rubrik",
    href: "/rubrik",
    title: "Rubrik puanlayıcı",
    blurb: "Kriterlere göre not; yazdırılabilir özet.",
    audience: "Öğretmen",
  },
  {
    id: "konu-haritasi",
    href: "/konu-haritasi",
    title: "LGS–YKS konu haritası",
    blurb: "Kazanım ağacı: LGS ve YKS kesişimi.",
    audience: "Rehberlik",
  },
  {
    id: "defter",
    href: "/defter",
    title: "Markdown ders defteri",
    blurb: "Not yaz → anında HTML önizleme.",
    audience: "Öğrenci",
  },
  {
    id: "paket",
    href: "/paket",
    title: "Açık ders paketi",
    blurb: "ders.json şeması + tarayıcıda doğrulama.",
    audience: "Geliştirici",
  },
];
