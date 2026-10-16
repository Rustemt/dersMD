import Link from "next/link";
import { getCourses } from "@/lib/courses";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const courses = getCourses();
  const first = courses[0];

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" aria-hidden />
        <div className="hero-inner">
          <p className="brand">DersMD</p>
          <h1>Markdown ile ders yaz, öğrenci tarayıcıda pratik yapsın.</h1>
          <p className="hero-copy">
            Açık kaynak eğitim formatı: JSON müfredat + etkileşimli quiz
            player. Öğretmen içerik ekler, geliştirici player’ı genişletir.
          </p>
          <div className="hero-cta">
            <Link
              href={first ? `/kurs/${first.id}` : "#kurslar"}
              className={cn(buttonVariants({ size: "lg" }), "cta-primary")}
            >
              Örnek kursa başla
            </Link>
            <Link
              href="#kurslar"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "cta-ghost",
              )}
            >
              Kursları gör
            </Link>
          </div>
        </div>
      </section>

      <section id="kurslar" className="section courses-section">
        <header className="section-head">
          <h2>Hazır kurslar</h2>
          <p>İçerik `content/courses` altında; sen de kendi dersini ekleyebilirsin.</p>
        </header>
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id}>
              <Link href={`/kurs/${course.id}`} className="course-row">
                <div>
                  <p className="course-meta">
                    {course.level} · {course.minutes} dk · {course.audience}
                  </p>
                  <h3>{course.title}</h3>
                  <p>{course.summary}</p>
                </div>
                <span className="course-go">Aç</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section how-section">
        <header className="section-head">
          <h2>Nasıl katkı verirsin?</h2>
          <p>Claude for Open Source için de işe yarayan yol: kullanılan, bakılan bir araç bırak.</p>
        </header>
        <ol className="how-list">
          <li>
            <strong>Kurs ekle</strong>
            <span>
              `content/courses/*.json` dosyası oluştur: ders metni + quiz.
            </span>
          </li>
          <li>
            <strong>Player’ı geliştir</strong>
            <span>
              Markdown parser, spaced repetition veya öğretmen paneli ekle.
            </span>
          </li>
          <li>
            <strong>Başkasına kullandır</strong>
            <span>
              Okul / bootcamp / dershaneye göster; issue ve PR kabul et.
            </span>
          </li>
        </ol>
      </section>
    </main>
  );
}
