import { NextResponse } from "next/server";
import { getCourse } from "@/lib/courses";

type Ctx = { params: Promise<{ courseId: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { courseId } = await ctx.params;
  const course = getCourse(courseId);
  if (!course) {
    return NextResponse.json({ error: "Kurs bulunamadı." }, { status: 404 });
  }
  return NextResponse.json(course);
}
