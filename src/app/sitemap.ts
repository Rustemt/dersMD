import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/courses";
import { EDU_MODULES } from "@/lib/modules";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/Rustemt/dersMD";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = EDU_MODULES.filter((m) => m.href.startsWith("/") && !m.href.includes("#")).map(
    (m) => ({
      url: `${BASE}${m.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const courseRoutes = getCourses().flatMap((course) => [
    {
      url: `${BASE}/kurs/${course.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...course.lessons.map((lesson) => ({
      url: `${BASE}/kurs/${course.id}/${lesson.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticRoutes,
    ...courseRoutes,
  ];
}
