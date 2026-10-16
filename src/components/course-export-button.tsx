"use client";

import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/course-types";
import { courseToMarkdown } from "@/lib/course-export";

export function CourseExportButton({ course }: { course: Course }) {
  function download() {
    const md = courseToMarkdown(course);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${course.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button type="button" variant="outline" size="lg" onClick={download}>
      Markdown indir
    </Button>
  );
}
