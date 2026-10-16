"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const CRITERIA = [
  { id: "icerik", label: "İçerik doğruluğu", max: 40 },
  { id: "aciklama", label: "Açıklama netliği", max: 30 },
  { id: "ornek", label: "Örnek / uygulama", max: 20 },
  { id: "biçim", label: "Biçim ve teslim", max: 10 },
];

export function RubrikClient() {
  const [student, setStudent] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(CRITERIA.map((c) => [c.id, 0])),
  );

  useEffect(() => {
    setDateLabel(new Date().toLocaleDateString("tr-TR"));
  }, []);

  const total = useMemo(
    () => CRITERIA.reduce((sum, c) => sum + (scores[c.id] || 0), 0),
    [scores],
  );
  const max = CRITERIA.reduce((sum, c) => sum + c.max, 0);

  return (
    <div className="tool-block print-area">
      <label className="field">
        <span>Öğrenci</span>
        <input value={student} onChange={(e) => setStudent(e.target.value)} />
      </label>
      <ul className="rubrik-list">
        {CRITERIA.map((c) => (
          <li key={c.id}>
            <div className="rubrik-row">
              <span>
                {c.label} <em>(/{c.max})</em>
              </span>
              <input
                type="number"
                min={0}
                max={c.max}
                value={scores[c.id]}
                onChange={(e) =>
                  setScores((s) => ({
                    ...s,
                    [c.id]: Math.min(c.max, Math.max(0, Number(e.target.value) || 0)),
                  }))
                }
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="timer-face small">
        {total} / {max}
      </p>
      <p className="stats-line">
        {student || "Adsız öğrenci"}
        {dateLabel ? ` · ${dateLabel}` : ""}
      </p>
      <Button type="button" className="no-print" onClick={() => window.print()}>
        Yazdır / PDF
      </Button>
    </div>
  );
}
