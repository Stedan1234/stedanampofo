import type { MetadataRoute } from "next";
import { getDocs } from "@/lib/content";
import { services } from "@/lib/services";
import { flags, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages: MetadataRoute.Sitemap = [
    { url: base, priority: 1 },
    { url: `${base}/about` },
    { url: `${base}/contact` },
  ];

  if (flags.work) {
    pages.push({ url: `${base}/work` });
    getDocs("work").forEach((d) => pages.push({ url: `${base}/work/${d.slug}` }));
  }
  if (flags.services) {
    pages.push({ url: `${base}/services` });
    services.forEach((s) => pages.push({ url: `${base}/services/${s.slug}` }));
  }
  if (flags.blog) {
    pages.push({ url: `${base}/blog` });
    getDocs("blog").forEach((d) =>
      pages.push({ url: `${base}/blog/${d.slug}`, lastModified: d.date || undefined })
    );
  }
  return pages;
}
