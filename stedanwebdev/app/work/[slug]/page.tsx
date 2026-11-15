import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTA } from '@/components/CTA';
import { Prose } from '@/components/Prose';
import { getDoc, getDocs, getSlugs } from '@/lib/content';
import { toHtml } from '@/lib/markdown';

export function generateStaticParams() {
  return getSlugs('work').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc('work', slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc('work', slug);
  if (!doc) notFound();

  const others = getDocs('work')
    .filter((d) => d.slug !== slug)
    .slice(0, 2);

const html = await toHtml(doc.body);
    
  return (
    <>
      <header className='mx-auto max-w-[1120px] px-[6vw] pt-[clamp(44px,6vw,80px)]'>
        <Link
          href='/work'
          className='text-[14px] text-ink-soft transition hover:text-accent-text'
        >
          ← All work
        </Link>

        <div className='mt-7 mb-2.5 flex flex-wrap items-center gap-2 text-[12px]'>
          <span
            className={
              doc.nature === 'concept'
                ? 'rounded-full border border-line px-2.5 py-0.5 text-ink-soft'
                : 'rounded-full bg-[var(--wash)] px-2.5 py-0.5 text-accent-text'
            }
          >
            {doc.nature === 'concept' ? 'Concept' : 'Client work'}
          </span>
          {doc.year && <span className='text-ink-soft'>{doc.year}</span>}
        </div>

        <h1 className='display max-w-[13em] text-[clamp(34px,6.4vw,76px)]'>
          {doc.title}
        </h1>

        <div className='mt-7 grid gap-x-[clamp(28px,5vw,72px)] gap-y-4 md:grid-cols-[1.4fr_0.6fr]'>
          {doc.summary && (
            <p className='text-[clamp(17px,1.9vw,21px)] font-light leading-[1.5]'>
              {doc.summary}
            </p>
          )}
          {doc.role && (
            <p className='border-t border-line pt-4 text-[14.5px] leading-[1.6] text-ink-soft md:border-l md:border-t-0 md:pl-6 md:pt-0'>
              {doc.role}
            </p>
          )}
        </div>

        {doc.cover && (
          <div className='mt-[clamp(28px,4vw,48px)] overflow-hidden rounded-[4px] border border-line bg-paper-2'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={doc.cover} alt='' className='block w-full' />
          </div>
        )}

        {doc.stats.length > 0 && (
          <dl className='grid grid-cols-2 border-b border-line md:grid-cols-4'>
            {doc.stats.map((s) => (
              <div key={s.label} className='py-[clamp(20px,3vw,34px)] pr-4'>
                <dd className='display text-[clamp(30px,4.4vw,52px)]'>{s.value}</dd>
                <dt className='mt-2 text-[13.5px] text-ink-soft'>{s.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </header>

      <article className='mx-auto max-w-[760px] px-[6vw] pb-[clamp(48px,7vw,90px)] pt-[clamp(36px,5vw,64px)]'>
        {doc.nature === 'concept' && (
          <p className='mb-10 rounded-[3px] border border-line bg-paper-2 px-5 py-4 text-[14.5px] text-ink-soft'>
            This is a self-initiated concept. There was no client and no brief —
            the problem, the constraints and the solution are all mine.
          </p>
        )}
        <Prose html={html} />
      </article>

      {others.length > 0 && (
        <section className='mx-auto max-w-[1120px] border-t border-line px-[6vw] py-[clamp(40px,6vw,72px)]'>
          <h2 className='display mb-6 text-[clamp(22px,3.4vw,32px)]'>
            More work
          </h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/work/${o.slug}`}
                className='rounded-[3px] border border-line bg-paper-2 p-6 transition hover:-translate-y-1 hover:border-accent'
              >
                <h3 className='display-sm text-[20px]'>{o.title}</h3>
                <p className='mt-2 text-[15px] text-ink-soft'>{o.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
