"use client";

import { FormEvent, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      email?: string;
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-dvh flex flex-col bg-gradient-to-b from-[#e3ece6] to-[#d5e2db] px-4">
      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="mb-4">
          <span className="rounded-full bg-white/80 px-4 py-1 text-xs font-medium text-willow-text shadow">
            WillowTax v1 • Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center font-bold tracking-tight text-4xl md:text-[4rem] max-w-4xl text-willow-text leading-[1.1]">
          Save Hours. <br className="hidden md:block" />
          Reduce Errors.
        </h1>

        {/* Subheading */}
        <p className="mt-2 max-w-xl text-center text-sm md:text-base text-neutral-700">
          Busy season made easy: Automatic slip entry, no typing required.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-8 flex w-full max-w-md flex-col sm:flex-row items-center gap-3 bg-white rounded-lg p-2 shadow"
        >
          <input
            required
            type="email"
            name="email"
            placeholder="Your email..."
            className="flex-1 rounded-md px-4 py-2 text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-willow-ring"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto rounded-md bg-willow-accent px-6 py-2 text-sm font-medium text-white shadow hover:bg-willow-accentHover transition disabled:opacity-70"
          >
            {status === "loading" ? "Joining…" : "Join the Waitlist"}
          </button>
        </form>

        {/* Feedback */}
        <div className="mt-3 min-h-[1.25rem] text-sm text-center">
          {status === "ok" && <span className="text-green-700">Thanks! You’re on the list.</span>}
          {status === "error" && <span className="text-red-700">Something went wrong. Try again.</span>}
        </div>
      </div>

      {/* Footer note pinned lower */}
      <p className="mb-6 text-center text-xs text-neutral-600">
        Built with expertise. <span className="font-semibold">Powered by AI.</span> Focused on you.
      </p>
    </main>
  );
}