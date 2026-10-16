"use client";

import { useState } from "react";
import type { Quiz } from "@/lib/course-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuizPanelProps = {
  quiz: Quiz;
  onPassed: () => void;
};

export function QuizPanel({ quiz, onPassed }: QuizPanelProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === quiz.answerIndex;

  function check() {
    if (selected === null) return;
    setChecked(true);
    if (selected === quiz.answerIndex) onPassed();
  }

  function retry() {
    setSelected(null);
    setChecked(false);
  }

  return (
    <section className="quiz-panel" aria-labelledby="quiz-heading">
      <p className="quiz-kicker">Kısa kontrol</p>
      <h2 id="quiz-heading">{quiz.prompt}</h2>
      <ul className="choice-list" role="list">
        {quiz.choices.map((choice, index) => {
          const isSelected = selected === index;
          const showState = checked && isSelected;
          return (
            <li key={choice}>
              <button
                type="button"
                className={cn(
                  "choice",
                  isSelected && "is-selected",
                  showState && correct && "is-correct",
                  showState && !correct && "is-wrong",
                )}
                onClick={() => {
                  if (checked && correct) return;
                  setSelected(index);
                  setChecked(false);
                }}
                disabled={checked && correct}
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
        {!checked || !correct ? (
          <Button type="button" onClick={check} disabled={selected === null}>
            Cevabı kontrol et
          </Button>
        ) : null}
        {checked && !correct ? (
          <Button type="button" variant="outline" onClick={retry}>
            Tekrar dene
          </Button>
        ) : null}
      </div>

      {checked ? (
        <p
          className={cn("quiz-feedback", correct ? "ok" : "bad")}
          role="status"
        >
          {correct ? "Doğru. " : "Henüz değil. "}
          {quiz.explain}
        </p>
      ) : null}
    </section>
  );
}
