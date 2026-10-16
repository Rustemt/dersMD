const STORAGE_KEY = "dersmd-progress-v1";

export type ProgressMap = Record<string, string[]>;

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

function write(map: ProgressMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getCompletedLessons(courseId: string): string[] {
  return read()[courseId] ?? [];
}

export function markLessonComplete(courseId: string, lessonId: string) {
  const map = read();
  const current = new Set(map[courseId] ?? []);
  current.add(lessonId);
  map[courseId] = [...current];
  write(map);
}

export function courseProgressPercent(courseId: string, totalLessons: number) {
  if (totalLessons === 0) return 0;
  const done = getCompletedLessons(courseId).length;
  return Math.round((done / totalLessons) * 100);
}
