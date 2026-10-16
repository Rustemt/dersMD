import type { Course, Lesson } from "./course-types";

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end < 0) return { meta: {}, body: raw };
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const meta: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body };
}

function parseLessonBlock(block: string): Lesson | null {
  const lines = block.trim().split("\n");
  const titleLine = lines[0] || "";
  const titleMatch = titleLine.match(/^##\s+Ders:\s*(.+)$/i);
  if (!titleMatch) return null;
  const id = titleMatch[1].trim();
  let title = id;
  let minutes = 5;
  const body: string[] = [];
  let quizPrompt = "";
  const choices: string[] = [];
  let answerIndex = -1;
  let explain = "";
  let inQuiz = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^minutes:\s*\d+/i.test(line)) {
      minutes = Number(line.split(":")[1]);
      continue;
    }
    if (/^###\s+Quiz/i.test(line)) {
      inQuiz = true;
      continue;
    }
    if (!inQuiz) {
      if (line.trim()) body.push(line.trim());
      continue;
    }
    if (line.startsWith("Soru:")) {
      quizPrompt = line.replace(/^Soru:\s*/, "").trim();
      continue;
    }
    if (line.startsWith("Açıklama:")) {
      explain = line.replace(/^Açıklama:\s*/, "").trim();
      continue;
    }
    const choice = line.match(/^- \[([ xX])\]\s*(.+)$/);
    if (choice) {
      if (choice[1].toLowerCase() === "x") answerIndex = choices.length;
      choices.push(choice[2].trim());
    }
  }

  if (body[0] && !body[0].startsWith("minutes")) {
    title = id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  if (!quizPrompt || choices.length < 2 || answerIndex < 0) return null;

  return {
    id,
    title,
    minutes,
    body,
    quiz: { prompt: quizPrompt, choices, answerIndex, explain },
  };
}

export function parseMarkdownCourse(raw: string): Course {
  const { meta, body } = parseFrontmatter(raw);
  const parts = body.split(/\n(?=##\s+Ders:)/i);
  const lessons = parts
    .map(parseLessonBlock)
    .filter((l): l is Lesson => Boolean(l));

  return {
    id: meta.id || "md-course",
    title: meta.title || "Markdown kurs",
    level: meta.level || "Başlangıç",
    minutes: Number(meta.minutes || lessons.reduce((s, l) => s + l.minutes, 0)),
    summary: meta.summary || "",
    audience: meta.audience || "",
    lessons,
  };
}
