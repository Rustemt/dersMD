"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const WORK = 25 * 60;
const BREAK = 5 * 60;
const KEY = "dersmd-pomodoro-v1";

type Stats = { date: string; completed: number; streak: number; goal: number };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function load(): Stats {
  const fallback: Stats = { date: today(), completed: 0, streak: 0, goal: 4 };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Stats;
    if (parsed.date !== today()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const y = yesterday.toISOString().slice(0, 10);
      return {
        date: today(),
        completed: 0,
        streak: parsed.date === y && parsed.completed >= parsed.goal ? parsed.streak : 0,
        goal: parsed.goal || 4,
      };
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export function PomodoroClient() {
  const [seconds, setSeconds] = useState(WORK);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    setStats(load());
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s > 1) return s - 1;
        window.clearInterval(id);
        setRunning(false);
        if (mode === "work") {
          setStats((prev) => {
            const base = prev ?? load();
            const next = {
              ...base,
              date: today(),
              completed: base.completed + 1,
              streak:
                base.completed + 1 >= base.goal ? Math.max(1, base.streak + (base.completed + 1 === base.goal ? 1 : 0)) : base.streak,
            };
            if (next.completed >= next.goal && base.completed < next.goal) {
              next.streak = Math.max(1, base.streak + 1);
            }
            localStorage.setItem(KEY, JSON.stringify(next));
            return next;
          });
          setMode("break");
          return BREAK;
        }
        setMode("work");
        return WORK;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, mode]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="tool-block pomodoro">
      <p className="eyebrow">{mode === "work" ? "Odak" : "Mola"}</p>
      <p className="timer-face">
        {mm}:{ss}
      </p>
      <div className="quiz-actions">
        <Button type="button" onClick={() => setRunning((r) => !r)}>
          {running ? "Duraklat" : "Başlat"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setRunning(false);
            setMode("work");
            setSeconds(WORK);
          }}
        >
          Sıfırla
        </Button>
      </div>
      {stats ? (
        <p className="stats-line">
          Bugün {stats.completed}/{stats.goal} pomodoro · streak {stats.streak} gün
        </p>
      ) : null}
    </div>
  );
}
