"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PublicRoom = {
  code: string;
  title: string;
  index: number;
  total: number;
  revealed: boolean;
  question: {
    prompt: string;
    choices: string[];
    answerIndex?: number;
  } | null;
  students: {
    id: string;
    name: string;
    answered: boolean;
    choice?: number;
  }[];
};

const SAMPLE = [
  {
    prompt: "2+2 kaçtır?",
    choices: ["3", "4", "5", "22"],
    answerIndex: 1,
  },
  {
    prompt: "Python'da atama operatörü?",
    choices: ["==", "=", ":=", "->"],
    answerIndex: 1,
  },
];

export function SinifQuizClient() {
  const [role, setRole] = useState<"pick" | "host" | "student">("pick");
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!room?.code) return;
    const id = window.setInterval(async () => {
      const res = await fetch(`/api/rooms/${room.code}`);
      if (res.ok) setRoom(await res.json());
    }, 1500);
    return () => window.clearInterval(id);
  }, [room?.code]);

  async function create() {
    setError(null);
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Canlı sınıf", questions: SAMPLE }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Oda açılamadı");
      return;
    }
    setRoom(data);
    setRole("host");
  }

  async function join() {
    setError(null);
    const res = await fetch(`/api/rooms/${joinCode.trim()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "join", name: name.trim() || "Öğrenci" }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Katılınamadı");
      return;
    }
    setStudentId(data.studentId);
    setRoom(data.room);
    setRole("student");
  }

  async function act(action: "reveal" | "next" | "answer", choiceIndex?: number) {
    if (!room) return;
    const res = await fetch(`/api/rooms/${room.code}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, studentId, choiceIndex }),
    });
    const data = await res.json();
    if (res.ok) setRoom(data);
  }

  if (role === "pick") {
    return (
      <div className="tool-block split-tools">
        <div>
          <h2 className="tool-title">Öğretmen</h2>
          <Button type="button" onClick={create}>
            Oda oluştur
          </Button>
        </div>
        <div>
          <h2 className="tool-title">Öğrenci</h2>
          <label className="field">
            <span>Adın</span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field">
            <span>Oda kodu</span>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            />
          </label>
          <Button type="button" onClick={join}>
            Katıl
          </Button>
        </div>
        {error ? <p className="quiz-feedback bad">{error}</p> : null}
      </div>
    );
  }

  if (!room?.question) return <p>Yükleniyor…</p>;

  return (
    <div className="tool-block">
      <p className="eyebrow">
        Kod {room.code} · soru {room.index + 1}/{room.total} · {room.students.length} öğrenci
      </p>
      <h2 className="tool-title">{room.question.prompt}</h2>
      <ul className="choice-list">
        {room.question.choices.map((choice, index) => (
          <li key={choice}>
            <button
              type="button"
              className={cn(
                "choice",
                room.revealed &&
                  room.question?.answerIndex === index &&
                  "is-correct",
              )}
              disabled={role === "host"}
              onClick={() => act("answer", index)}
            >
              <span className="choice-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{choice}</span>
            </button>
          </li>
        ))}
      </ul>
      {role === "host" ? (
        <div className="quiz-actions">
          <Button type="button" variant="outline" onClick={() => act("reveal")}>
            Cevabı göster
          </Button>
          <Button type="button" onClick={() => act("next")}>
            Sonraki soru
          </Button>
        </div>
      ) : null}
      <ul className="student-list">
        {room.students.map((s) => (
          <li key={s.id}>
            {s.name} — {s.answered ? "yanıtladı" : "bekliyor"}
            {room.revealed && s.choice !== undefined
              ? ` (${String.fromCharCode(65 + s.choice)})`
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
