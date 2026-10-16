import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/courses";
import { CourseProgress } from "@/components/course-progress";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ courseId: string }>;
};

export function generateStaticParams() {
  return getCourses().map((course) => ({ courseId: course.id }));
}

export default async function CoursePage({ params }: PageProps) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const firstLesson = course.lessons[0];

  return (
    <main className="page-pad">
      <Link href="/" className="back-link">
        ← DersMD
      </Link>
      <header className="course-hero">
        <p className="eyebrow">{course.level}</p>
        <h1>{course.title}</h1>
        <p className="lede">{course.summary}</p>
        <p className="muted">
          {course.minutes} dakika · {course.lessons.length} ders ·{" "}
          {course.audience}
        </p>
        <CourseProgress
          courseId={course.id}
          totalLessons={course.lessons.length}
        />
        {firstLesson ? (
          <Link
            href={`/kurs/${course.id}/${firstLesson.id}`}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
          >
            İlk derse başla
          </Link>
        ) : null}
      </header>

      <section className="section-tight">
        <h2>Dersler</h2>
        <ol className="lesson-list">
          {course.lessons.map((lesson, index) => (
            <li key={lesson.id}>
              <Link
                href={`/kurs/${course.id}/${lesson.id}`}
                className="lesson-row"
              >
                <span className="lesson-index">{index + 1}</span>
                <span>
                  <strong>{lesson.title}</strong>
                  <em>{lesson.minutes} dk</em>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
