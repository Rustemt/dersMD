"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEYS = [
  "dersmd-progress-v1",
  "dersmd-pomodoro-v1",
  "dersmd-odev-v1",
] as const;

type Bundle = Record<string, unknown>;

export function IlerlemeClient() {
  const [preview, setPreview] = useState("{}");
  const [msg, setMsg] = useState<string | null>(null);

  function readBundle(): Bundle {
    const out: Bundle = {};
    for (const key of KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          out[key] = JSON.parse(raw);
        } catch {
          out[key] = raw;
        }
      }
    }
    return out;
  }

  useEffect(() => {
    setPreview(JSON.stringify(readBundle(), null, 2));
  }, []);

  function refresh() {
    setPreview(JSON.stringify(readBundle(), null, 2));
    setMsg("Güncellendi.");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(readBundle(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dersmd-ilerleme-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg("İndirildi.");
  }

  function importJson(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Bundle;
        for (const key of KEYS) {
          if (key in data) {
            localStorage.setItem(key, JSON.stringify(data[key]));
          }
        }
        setPreview(JSON.stringify(readBundle(), null, 2));
        setMsg("İçe aktarıldı.");
      } catch {
        setMsg("Geçersiz JSON.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="tool-block">
      <div className="quiz-actions">
        <Button type="button" onClick={exportJson}>
          Dışa aktar
        </Button>
        <Button type="button" variant="outline" onClick={refresh}>
          Yenile
        </Button>
        <label className="file-btn">
          <span>İçe aktar</span>
          <input
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importJson(file);
            }}
          />
        </label>
      </div>
      {msg ? <p className="stats-line">{msg}</p> : null}
      <pre className="code-preview">{preview}</pre>
    </div>
  );
}
