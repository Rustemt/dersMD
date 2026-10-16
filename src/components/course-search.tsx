"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Course } from "@/lib/course-types";

export function CourseSearch({ courses }: { courses: Course[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase("tr");
    if (!needle) return courses;
    return courses.filter((c) =>
      [c.title, c.summary, c.level, c.audience, c.id]
        .join(" ")
        .toLocaleLowerCase("tr")
        .includes(needle),
    );
  }, [courses, q]);

  return (
    <div className="tool-block">
      <label className="field">
        <span>Kurs ara</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="python, LGS, html…"
        />
      </label>
      <ul className="course-list">
        {filtered.map((course) => (
          <li key={course.id}>
            <Link href={`/kurs/${course.id}`} className="course-row">
              <div>
                <p className="course-meta">
                  {course.level} · {course.minutes} dk · {course.audience}
                </p>
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
              </div>
              <span className="course-go">Aç</span>
            </Link>
          </li>
        ))}
      </ul>
      {!filtered.length ? (
        <p className="empty-note">Eşleşen kurs yok.</p>
      ) : null}
    </div>
  );
}
