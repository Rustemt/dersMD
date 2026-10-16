"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { validateCoursePackage } from "@/lib/package-schema";

const SAMPLE = `{
  "id": "ornek-kurs",
  "title": "Örnek Kurs",
  "level": "Başlangıç",
  "minutes": 15,
  "summary": "Şema doğrulama örneği",
  "audience": "Geliştiriciler",
  "lessons": [
    {
      "id": "giris",
      "title": "Giriş",
      "minutes": 5,
      "body": ["Bu bir örnek derstir."],
      "quiz": {
        "prompt": "2+2?",
        "choices": ["3", "4", "5"],
        "answerIndex": 1,
        "explain": "4"
      }
    }
  ]
}`;

export function PaketClient() {
  const [text, setText] = useState(SAMPLE);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  return (
    <div className="tool-block">
      <label className="field">
        <span>ders.json</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          className="codey"
        />
      </label>
      <Button
        type="button"
        onClick={() => {
          try {
            const parsed = JSON.parse(text);
            const result = validateCoursePackage(parsed);
            setOk(result.ok);
            setErrors(result.errors);
          } catch {
            setOk(false);
            setErrors(["JSON parse hatası — sözdizimini kontrol et."]);
          }
        }}
      >
        Doğrula
      </Button>
      {ok === true ? (
        <p className="quiz-feedback ok">Paket geçerli. `content/courses` altına koyup `courses.ts` içine import et.</p>
      ) : null}
      {ok === false && errors ? (
        <ul className="error-list">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ) : null}
      <p className="empty-note">
        Tam şema: <code>content/SCHEMA.md</code>
      </p>
    </div>
  );
}
