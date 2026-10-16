import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourses, getLesson } from "@/lib/courses";
import { LessonPlayer } from "@/components/lesson-player";

type PageProps = {
  params: Promise<{ courseId: string; lessonId: string }>;
};

export function generateStaticParams() {
  return getCourses().flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    })),
  );
}

export default async function LessonPage({ params }: PageProps) {
  const { courseId, lessonId } = await params;
  const data = getLesson(courseId, lessonId);
  if (!data) notFound();

  return (
    <main className="page-pad">
      <Link href={`/kurs/${data.course.id}`} className="back-link">
        ← {data.course.title}
      </Link>
      <LessonPlayer
        course={data.course}
        lesson={data.lesson}
        index={data.index}
        total={data.total}
        prevId={data.prev?.id}
        nextId={data.next?.id}
      />
    </main>
  );
}
