import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/** Markdown → HTML string. GFM enabled, so tables and strikethrough work. */
export async function toHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return figures(String(file));
}

/**
 * A paragraph holding only an image becomes a <figure>. The image title,
 * written as ![alt](/path.webp "Caption here"), becomes the caption.
 */
function figures(html: string): string {
  return html.replace(/<p>(<img\b[^>]*>)<\/p>/g, (_m, img: string) => {
    const title = img.match(/\stitle="([^"]*)"/)?.[1];
    const clean = img.replace(/\stitle="[^"]*"/, "");
    return `<figure>${clean}${title ? `<figcaption>${title}</figcaption>` : ""}</figure>`;
  });
}
