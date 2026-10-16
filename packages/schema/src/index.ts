export type PackageLesson = {
  id: string;
  title: string;
  minutes: number;
  body: string[];
  quiz: {
    prompt: string;
    choices: string[];
    answerIndex: number;
    explain: string;
  };
};

export type CoursePackage = {
  id: string;
  title: string;
  level: string;
  minutes: number;
  summary: string;
  audience: string;
  lessons: PackageLesson[];
};

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

export function validateCoursePackage(raw: unknown): ValidationResult {
  const errors: string[] = [];
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: ["Kök değer bir nesne olmalı."] };
  }
  const obj = raw as Record<string, unknown>;
  for (const key of ["id", "title", "level", "summary", "audience"] as const) {
    if (typeof obj[key] !== "string" || !(obj[key] as string).trim()) {
      errors.push(`"${key}" dolu bir metin olmalı.`);
    }
  }
  if (typeof obj.minutes !== "number" || obj.minutes <= 0) {
    errors.push('"minutes" pozitif sayı olmalı.');
  }
  if (!Array.isArray(obj.lessons) || obj.lessons.length === 0) {
    errors.push('"lessons" en az bir ders içermeli.');
  } else {
    obj.lessons.forEach((lesson, i) => {
      if (!lesson || typeof lesson !== "object") {
        errors.push(`lessons[${i}] nesne olmalı.`);
        return;
      }
      const L = lesson as Record<string, unknown>;
      if (typeof L.id !== "string") errors.push(`lessons[${i}].id eksik.`);
      if (typeof L.title !== "string") errors.push(`lessons[${i}].title eksik.`);
      if (typeof L.minutes !== "number") {
        errors.push(`lessons[${i}].minutes sayı olmalı.`);
      }
      if (!Array.isArray(L.body) || L.body.length === 0) {
        errors.push(`lessons[${i}].body boş olamaz.`);
      }
      const quiz = L.quiz as Record<string, unknown> | undefined;
      if (!quiz || typeof quiz !== "object") {
        errors.push(`lessons[${i}].quiz gerekli.`);
      } else {
        if (typeof quiz.prompt !== "string") {
          errors.push(`lessons[${i}].quiz.prompt eksik.`);
        }
        if (!Array.isArray(quiz.choices) || quiz.choices.length < 2) {
          errors.push(`lessons[${i}].quiz.choices en az 2 şık olmalı.`);
        }
        if (typeof quiz.answerIndex !== "number") {
          errors.push(`lessons[${i}].quiz.answerIndex sayı olmalı.`);
        } else if (
          Array.isArray(quiz.choices) &&
          (quiz.answerIndex < 0 || quiz.answerIndex >= quiz.choices.length)
        ) {
          errors.push(`lessons[${i}].quiz.answerIndex şık aralığı dışında.`);
        }
        if (typeof quiz.explain !== "string") {
          errors.push(`lessons[${i}].quiz.explain eksik.`);
        }
      }
    });
  }
  return { ok: errors.length === 0, errors };
}
