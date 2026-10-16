"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const PROMPTS = [
  "Bugün ders çalışmak istiyorum.",
  "Python değişkenleri isimlendirirken anlamlı kelimeler kullan.",
  "Oran ve orantı LGS matematik konularındandır.",
];

function normalize(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function DikteClient() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const prompt = PROMPTS[index];

  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setResult("Bu tarayıcı sesli okumayı desteklemiyor.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(prompt);
    u.lang = "tr-TR";
    window.speechSynthesis.speak(u);
  }

  function check() {
    const ok = normalize(typed) === normalize(prompt);
    setResult(ok ? "Doğru yazıldı." : `Henüz değil. Doğrusu: “${prompt}”`);
  }

  return (
    <div className="tool-block">
      <p className="eyebrow">Cümle {index + 1}/{PROMPTS.length}</p>
      <div className="quiz-actions">
        <Button type="button" onClick={speak}>
          Dinle
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIndex((i) => (i + 1) % PROMPTS.length);
            setTyped("");
            setResult(null);
          }}
        >
          Sonraki cümle
        </Button>
      </div>
      <label className="field">
        <span>Duyduğunu yaz</span>
        <textarea
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          rows={3}
          placeholder="Buraya yaz…"
        />
      </label>
      <Button type="button" onClick={check}>
        Kontrol et
      </Button>
      {result ? <p className="stats-line">{result}</p> : null}
    </div>
  );
}
