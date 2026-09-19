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
  const workDocs = getDocs("work");
  if (workDocs.length > 0) {
    pages.push({ url: `${base}/work` });
    workDocs.forEach((d) => pages.push({ url: `${base}/work/${d.slug}` }));
  }
}
  if (flags.services) {
    pages.push({ url: `${base}/services` });
    services.forEach((s) => pages.push({ url: `${base}/services/${s.slug}` }));
  }
  if (flags.blog) {
    const blogDocs = getDocs("blog");
    if (blogDocs.length > 0) {
      pages.push({ url: `${base}/blog` });
      blogDocs.forEach((d) =>
        pages.push({ url: `${base}/blog/${d.slug}`, lastModified: d.date || undefined })
      );
    }
  }
  return pages;
}
