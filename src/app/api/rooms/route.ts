import { NextResponse } from "next/server";
import { createRoom, publicRoom } from "@/lib/rooms-store";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    title?: string;
    questions?: {
      prompt: string;
      choices: string[];
      answerIndex: number;
    }[];
  };
  if (!body.questions?.length) {
    return NextResponse.json({ error: "En az bir soru gerekli." }, { status: 400 });
  }
  const room = createRoom(body.title?.trim() || "Sınıf quiz", body.questions);
  return NextResponse.json(publicRoom(room));
}
