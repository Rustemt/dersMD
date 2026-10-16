"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { courseProgressPercent } from "@/lib/progress";

type CourseProgressProps = {
  courseId: string;
  totalLessons: number;
};

export function CourseProgress({ courseId, totalLessons }: CourseProgressProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(courseProgressPercent(courseId, totalLessons));
  }, [courseId, totalLessons]);

  return (
    <div className="course-progress">
      <div className="course-progress-meta">
        <span>İlerleme</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
