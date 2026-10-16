import Link from "next/link";
import { getCourses } from "@/lib/courses";
import { EDU_MODULES } from "@/lib/modules";
import { CourseSearch } from "@/components/course-search";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const courses = getCourses();
  const first = courses[0];
  const tools = EDU_MODULES.filter((m) => m.id !== "kurslar");

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" aria-hidden />
        <div className="hero-inner">
          <p className="brand">DersMD</p>
          <h1>Açık kaynak eğitim araç seti: ders, quiz, tekrar, sınıf.</h1>
          <p className="hero-copy">
            On bir modül: müfredat player’dan canlı sınıf quiz’ine, rubrikten
            LGS–YKS haritasına. İçerik JSON; kod MIT.
          </p>
          <div className="hero-cta">
            <Link
              href="#moduller"
              className={cn(buttonVariants({ size: "lg" }), "cta-primary")}
            >
              Modülleri gör
            </Link>
            <Link
              href={first ? `/kurs/${first.id}` : "#kurslar"}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "cta-ghost",
              )}
            >
              Örnek kurs
            </Link>
          </div>
        </div>
      </section>

      <section id="moduller" className="section courses-section">
        <header className="section-head">
          <h2>Modüller</h2>
          <p>Hepsi aynı repoda; istediğini fork’la veya PR ile genişlet.</p>
        </header>
        <ul className="course-list">
          {tools.map((m) => (
            <li key={m.id}>
              <Link href={m.href} className="course-row">
                <div>
                  <p className="course-meta">{m.audience}</p>
                  <h3>{m.title}</h3>
                  <p>{m.blurb}</p>
                </div>
                <span className="course-go">Aç</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="kurslar" className="section">
        <header className="section-head">
          <h2>Hazır kurslar</h2>
          <p>
            JSON + Markdown içerik · npm:{" "}
            <a href="https://www.npmjs.com/package/@dersmd/schema">@dersmd/schema</a>
          </p>
        </header>
        <CourseSearch courses={courses} />
      </section>

      <section className="section how-section">
        <header className="section-head">
          <h2>Açık kaynak</h2>
          <p>MIT lisans. Kurs, kart, soru ve konu JSON’ları PR ile gelir.</p>
        </header>
        <ol className="how-list">
          <li>
            <strong>İçerik ekle</strong>
            <span>`content/` altındaki JSON dosyalarını çoğalt.</span>
          </li>
          <li>
            <strong>Modül geliştir</strong>
            <span>`src/app/` içinde yeni rota veya mevcut aracı iyileştir.</span>
          </li>
          <li>
            <strong>GitHub’a koy</strong>
            <span>Repo oluştur, push et, README’deki kurulum adımlarını izle.</span>
          </li>
        </ol>
      </section>
    </main>
  );
}
