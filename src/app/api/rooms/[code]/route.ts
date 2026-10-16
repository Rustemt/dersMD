import { NextResponse } from "next/server";
import {
  answerRoom,
  getRoom,
  joinRoom,
  nextQuestion,
  publicRoom,
  revealRoom,
} from "@/lib/rooms-store";

type Ctx = { params: Promise<{ code: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { code } = await ctx.params;
  const room = getRoom(code);
  if (!room) return NextResponse.json({ error: "Oda yok." }, { status: 404 });
  return NextResponse.json(publicRoom(room));
}

export async function POST(req: Request, ctx: Ctx) {
  const { code } = await ctx.params;
  const body = (await req.json()) as {
    action: "join" | "answer" | "next" | "reveal";
    name?: string;
    studentId?: string;
    choiceIndex?: number;
  };

  if (body.action === "join") {
    const result = joinRoom(code, body.name?.trim() || "Öğrenci");
    if (!result) return NextResponse.json({ error: "Oda yok." }, { status: 404 });
    return NextResponse.json({
      studentId: result.studentId,
      room: publicRoom(result.room),
    });
  }

  if (body.action === "answer") {
    if (!body.studentId || body.choiceIndex === undefined) {
      return NextResponse.json({ error: "Eksik alan." }, { status: 400 });
    }
    const room = answerRoom(code, body.studentId, body.choiceIndex);
    if (!room) return NextResponse.json({ error: "Oda/öğrenci yok." }, { status: 404 });
    return NextResponse.json(publicRoom(room));
  }

  if (body.action === "next") {
    const room = nextQuestion(code);
    if (!room) return NextResponse.json({ error: "Oda yok." }, { status: 404 });
    return NextResponse.json(publicRoom(room));
  }

  if (body.action === "reveal") {
    const room = revealRoom(code);
    if (!room) return NextResponse.json({ error: "Oda yok." }, { status: 404 });
    return NextResponse.json(publicRoom(room));
  }

  return NextResponse.json({ error: "Bilinmeyen action." }, { status: 400 });
}
