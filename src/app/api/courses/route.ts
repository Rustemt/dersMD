import { NextResponse } from "next/server";
import { getCourses } from "@/lib/courses";

export async function GET() {
  const courses = getCourses().map((c) => ({
    id: c.id,
    title: c.title,
    level: c.level,
    minutes: c.minutes,
    summary: c.summary,
    audience: c.audience,
    lessonCount: c.lessons.length,
  }));
  return NextResponse.json({ courses });
}
