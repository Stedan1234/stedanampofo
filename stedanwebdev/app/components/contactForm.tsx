import { useForm, ValidationError } from "@formspree/react";
import { FaTelegramPlane } from "react-icons/fa";
import { useEffect, useState } from "react";

export function ContactForm() {
  const [state, handleSubmit] = useForm("myzejzew");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setIsSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [state.succeeded]);

  return isSuccess ? (
    <p className="text-green-500 font-bold">
      Message has been sent successfully! Refreshing...
    </p>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">Send Me a Message</h2>

      <label htmlFor="name" className="font-medium">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--span-color)] focus:border-transparent"
      />
      <ValidationError prefix="Name" field="name" errors={state.errors} />

      <label htmlFor="email" className="font-medium">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--span-color)] focus:border-transparent"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="message" className="font-medium">
        Message
      </label>
      <textarea
        name="message"
        id="message"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--span-color)] focus:border-transparent"
      ></textarea>
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="flex items-center justify-center gap-1 px-4 py-2 text-[var(--text-color)] hover:text-[var(--span-color)] rounded-md hover:bg-text transition-all duration-300"
      >
        Send Message <FaTelegramPlane />
      </button>
    </form>
  );
}
