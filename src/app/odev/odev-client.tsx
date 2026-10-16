"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Submission = {
  id: string;
  name: string;
  link: string;
  note: string;
  checked: boolean;
  at: string;
};

const KEY = "dersmd-odev-v1";

export function OdevClient() {
  const [items, setItems] = useState<Submission[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  function save(next: Submission[]) {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <div className="tool-block">
      <form
        className="form-stack"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !link.trim()) return;
          save([
            {
              id: crypto.randomUUID(),
              name: name.trim(),
              link: link.trim(),
              note: note.trim(),
              checked: false,
              at: new Date().toLocaleString("tr-TR"),
            },
            ...items,
          ]);
          setName("");
          setLink("");
          setNote("");
        }}
      >
        <label className="field">
          <span>Öğrenci adı</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field">
          <span>Teslim linki / dosya yolu</span>
          <input value={link} onChange={(e) => setLink(e.target.value)} required />
        </label>
        <label className="field">
          <span>Not</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <Button type="submit">Teslim et</Button>
      </form>

      <ul className="check-list">
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() =>
                  save(
                    items.map((x) =>
                      x.id === item.id ? { ...x, checked: !x.checked } : x,
                    ),
                  )
                }
              />
              <span>
                <strong>{item.name}</strong> — {item.link}
                {item.note ? ` (${item.note})` : ""} · {item.at}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {!items.length ? <p className="empty-note">Henüz teslim yok.</p> : null}
    </div>
  );
}
