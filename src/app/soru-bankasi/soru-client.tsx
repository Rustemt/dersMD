"use client";

import { useEffect, useMemo, useState } from "react";
import type { QuestionBank } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SoruBankasiClient({ banks }: { banks: QuestionBank[] }) {
  const [bankId, setBankId] = useState(banks[0]?.id);
  const bank = banks.find((b) => b.id === bankId) ?? banks[0];
  const [queue, setQueue] = useState(bank.questions.map((q) => q.id));
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [wrong, setWrong] = useState<string[]>([]);

  useEffect(() => {
    setQueue(bank.questions.map((q) => q.id));
    setWrong([]);
    setSelected(null);
    setChecked(false);
  }, [bank]);

  const current = useMemo(
    () => bank.questions.find((q) => q.id === queue[0]),
    [bank.questions, queue],
  );

  return (
    <div className="tool-block">
      <label className="field">
        <span>Banka</span>
        <select value={bank.id} onChange={(e) => setBankId(e.target.value)}>
          {banks.map((b) => (
            <option key={b.id} value={b.id}>
              {b.topic} — {b.title}
            </option>
          ))}
        </select>
      </label>

      {!current ? (
        <>
          <p className="empty-note">Tur bitti.</p>
          <Button
            type="button"
            onClick={() => {
              setQueue(
                wrong.length ? [...wrong] : bank.questions.map((q) => q.id),
              );
              setWrong([]);
              setSelected(null);
              setChecked(false);
            }}
          >
            {wrong.length ? "Yanlışları tekrarla" : "Baştan başla"}
          </Button>
        </>
      ) : (
        <>
          <p className="eyebrow">
            {bank.topic} · kalan {queue.length}
          </p>
          <h2 className="tool-title">{current.prompt}</h2>
          <ul className="choice-list">
            {current.choices.map((choice, index) => {
              const correct = selected === current.answerIndex;
              return (
                <li key={choice}>
                  <button
                    type="button"
                    className={cn(
                      "choice",
                      selected === index && "is-selected",
                      checked && selected === index && correct && "is-correct",
                      checked && selected === index && !correct && "is-wrong",
                    )}
                    onClick={() => {
                      if (checked) return;
                      setSelected(index);
                    }}
                  >
                    <span className="choice-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{choice}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="quiz-actions">
            {!checked ? (
              <Button
                type="button"
                disabled={selected === null}
                onClick={() => {
                  setChecked(true);
                  if (selected !== current.answerIndex) {
                    setWrong((w) => [...new Set([...w, current.id])]);
                  }
                }}
              >
                Kontrol et
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  setQueue((q) => q.slice(1));
                  setSelected(null);
                  setChecked(false);
                }}
              >
                Sonraki
              </Button>
            )}
          </div>
          {checked ? (
            <p
              className={cn(
                "quiz-feedback",
                selected === current.answerIndex ? "ok" : "bad",
              )}
            >
              {selected === current.answerIndex
                ? "Doğru. "
                : "Yanlış — kuyruğa alındı. "}
              {current.explain}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
