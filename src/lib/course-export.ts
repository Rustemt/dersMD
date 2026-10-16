import type { Course } from "./course-types";

export function courseToMarkdown(course: Course): string {
  const front = [
    "---",
    `id: ${course.id}`,
    `title: "${course.title.replace(/"/g, '\\"')}"`,
    `level: ${course.level}`,
    `minutes: ${course.minutes}`,
    `summary: ${course.summary}`,
    `audience: ${course.audience}`,
    "---",
    "",
  ].join("\n");

  const lessons = course.lessons
    .map((lesson) => {
      const choices = lesson.quiz.choices
        .map((c, i) => `- [${i === lesson.quiz.answerIndex ? "x" : " "}] ${c}`)
        .join("\n");
      return [
        `## Ders: ${lesson.id}`,
        `minutes: ${lesson.minutes}`,
        "",
        ...lesson.body,
        "",
        "### Quiz",
        `Soru: ${lesson.quiz.prompt}`,
        choices,
        `Açıklama: ${lesson.quiz.explain}`,
        "",
      ].join("\n");
    })
    .join("\n");

  return `${front}\n${lessons}`.trim() + "\n";
}
