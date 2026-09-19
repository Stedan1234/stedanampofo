import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// import remarkGfm from 'remark-gfm';
import { CTA } from '@/components/CTA';
import { formatDate, getDoc, getSlugs } from '@/lib/content';
import { flags } from '@/lib/site';
import { toHtml } from '@/lib/markdown';

export function generateStaticParams() {
  return getSlugs('blog').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc('blog', slug);
  return doc ? { title: doc.title, description: doc.summary } : {};
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!flags.blog) notFound();
  const { slug } = await params;
  const doc = getDoc('blog', slug);
  if (!doc) notFound();

  const html = await toHtml(doc.body);

  return (
    <>
      <article className='mx-auto max-w-[720px] px-[6vw] pb-[clamp(48px,7vw,90px)] pt-[clamp(44px,6vw,80px)]'>
        <Link
          href='/blog'
          className='text-[14px] text-ink-soft transition hover:text-accent-text'
        >
          ← All writing
        </Link>
        <p className='mt-7 text-[13.5px] text-ink-soft'>
          {formatDate(doc.date)}
        </p>
        <h1 className='display mt-2 text-[clamp(32px,5.6vw,56px)]'>
          {doc.title}
        </h1>
        {doc.summary && (
          <p className='mt-5 text-[clamp(16.5px,1.8vw,20px)] font-light leading-[1.5] text-ink-soft'>
            {doc.summary}
          </p>
        )}
        <hr className='my-10 border-line' />
        <div className='prose-s'>
          <div className='prose-s' dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
      <CTA />
    </>
  );
}
