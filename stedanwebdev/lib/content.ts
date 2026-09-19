import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Kind = "work" | "blog";

export type Doc = {
  slug: string;
  kind: Kind;
  title: string;
  summary: string;
  date: string;
  /** "client" = real paid or employed work. "concept" = self-initiated / speculative. */
  nature?: "client" | "concept";
  role?: string;
  year?: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  body: string;
};

const DIR = (kind: Kind) => path.join(process.cwd(), "content", kind);

function readAll(kind: Kind): Doc[] {
  const dir = DIR(kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug ?? file.replace(/\.mdx?$/, ""),
        kind,
        title: data.title ?? "Untitled",
        summary: data.summary ?? "",
        date: data.date ? String(data.date) : "",
        nature: data.nature ?? "client",
        role: data.role ?? "",
        year: data.year ? String(data.year) : "",
        tags: data.tags ?? [],
        cover: data.cover ?? "",
        draft: Boolean(data.draft),
        body: content,
      } as Doc;
    })
    .filter((d) => !d.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Published docs only (drafts appear in `next dev`, never in production). */
export const getDocs = (kind: Kind) =>
  readAll(kind).filter((d) => !d.draft || process.env.NODE_ENV === "development");

export const getDoc = (kind: Kind, slug: string) =>
  getDocs(kind).find((d) => d.slug === slug);

export const getSlugs = (kind: Kind) => getDocs(kind).map((d) => d.slug);

export function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
