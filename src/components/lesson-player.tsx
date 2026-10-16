"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Course, Lesson } from "@/lib/course-types";
import { markLessonComplete } from "@/lib/progress";
import { QuizPanel } from "@/components/quiz-panel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LessonPlayerProps = {
  course: Course;
  lesson: Lesson;
  index: number;
  total: number;
  prevId?: string;
  nextId?: string;
};

export function LessonPlayer({
  course,
  lesson,
  index,
  total,
  prevId,
  nextId,
}: LessonPlayerProps) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    setPassed(false);
  }, [lesson.id]);

  function handlePassed() {
    setPassed(true);
    markLessonComplete(course.id, lesson.id);
  }

  return (
    <article className="lesson-shell">
      <header className="lesson-header">
        <p className="eyebrow">
          {course.title} · Ders {index + 1}/{total}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lede">Yaklaşık {lesson.minutes} dakika</p>
      </header>

      <div className="lesson-body">
        {lesson.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <QuizPanel quiz={lesson.quiz} onPassed={handlePassed} />

      <nav className="lesson-nav" aria-label="Ders gezintisi">
        {prevId ? (
          <Link
            href={`/kurs/${course.id}/${prevId}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Önceki ders
          </Link>
        ) : (
          <span />
        )}
        {passed && nextId ? (
          <Link
            href={`/kurs/${course.id}/${nextId}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Sonraki ders
          </Link>
        ) : null}
        {passed && !nextId ? (
          <Link
            href={`/kurs/${course.id}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Kursu bitir
          </Link>
        ) : null}
        {!passed ? (
          <p className="nav-hint">Devam için quiz’i doğru yanıtla.</p>
        ) : null}
      </nav>
    </article>
  );
}
