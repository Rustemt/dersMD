import pythonIlkAdim from "../../content/courses/python-ilk-adim.json";
import ingilizceA1 from "../../content/courses/ingilizce-a1-gunluk.json";
import type { Course } from "./course-types";

const courses: Course[] = [
  pythonIlkAdim as Course,
  ingilizceA1 as Course,
];

export function getCourses(): Course[] {
  return courses;
}

export function getCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  const index = course.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return undefined;
  return {
    course,
    lesson: course.lessons[index],
    index,
    total: course.lessons.length,
    prev: course.lessons[index - 1],
    next: course.lessons[index + 1],
  };
}
