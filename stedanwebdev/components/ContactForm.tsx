"use client";
import { useForm, ValidationError } from "@formspree/react";
import { site } from "@/lib/site";

const field =
  "w-full rounded-[3px] border border-line bg-paper-2 px-4 py-3 text-[15.5px] text-ink outline-none transition focus:border-accent";

export function ContactForm() {
  const [state, handleSubmit] = useForm(site.formspreeId || "placeholder");

  if (!site.formspreeId) {
    return (
      <div className="rounded-[3px] border border-line bg-paper-2 p-6 text-[15px] text-ink-soft">
        The form isn&apos;t connected yet. Set <code>NEXT_PUBLIC_FORMSPREE_ID</code> in your
        environment variables, or email{" "}
        <a href={`mailto:${site.email}`} className="text-accent-text">{site.email}</a> in the meantime.
      </div>
    );
  }

  if (state.succeeded) {
    return (
      <div className="rounded-[3px] border border-accent bg-paper-2 p-6">
        <p className="display-sm text-[20px]">Got it.</p>
        <p className="mt-2 text-[15.5px] text-ink-soft">
          I&apos;ll come back to you within two working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-[13px] text-ink-soft">Name</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] text-ink-soft">Email</label>
        <input id="email" type="email" name="email" required className={field} />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-[13px] text-accent-text" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-[13px] text-ink-soft">
          What are you building?
        </label>
        <textarea id="message" name="message" rows={6} required className={field} />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-[13px] text-accent-text" />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="rounded-[3px] bg-accent px-6 py-3.5 text-[15px] text-accent-on transition hover:-translate-y-0.5 disabled:opacity-50"
      >
        {state.submitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
