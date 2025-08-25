"use client";

import { FormEvent, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as {
      name?: string;
      email?: string;
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-dvh w-full flex items-center justify-center p-4 md:p-8">
      {/* Card */}
      <div
        className="
          w-full max-w-2xl rounded-3xl border border-black/10 bg-willow-card
          shadow-card p-6 md:p-10
        "
      >
        {/* Top copy */}
        <section className="text-center space-y-3 md:space-y-4">
          <h1 className="font-serif font-bold tracking-tight text-2xl md:text-[28px] leading-[1.2]">
            Automate Tax Slips. Save Hours. Reduce Errors.
          </h1>
          <p className="mx-auto max-w-prose text-sm md:text-base text-neutral-800">
            WillowTax makes T4s, T5s, and other slips simple, fast, and compliant.
            Built for accountants and business owners who want to reclaim tax season.
          </p>
        </section>

        {/* Benefits */}
        <ul className="mt-6 md:mt-8 space-y-3 text-sm md:text-[15px] text-willow-text">
          <li className="flex gap-3 items-start">
            <span className="mt-0.5"> </span>
            <span><span className="font-semibold">Save Time</span> - input tax slips details quickly.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="mt-0.5"> </span>
            <span><span className="font-semibold">Reduce Errors</span> - automated compliance checks.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="mt-0.5"> </span>
            <span><span className="font-semibold">Increase Profitability</span> - more time for billable work, less on admin.</span>
          </li>
        </ul>

        {/* Divider with even rhythm */}
        <div className="my-8 md:my-10 h-px bg-black/10" />

        {/* Waitlist title */}
        <h2 className="text-center font-serif font-bold text-xl md:text-2xl leading-tight mb-4">
          Join the waitlist for<br className="hidden md:block" /> WillowTax
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid gap-3 md:gap-4">
          <input
            required
            name="name"
            type="text"
            placeholder="Full Name"
            className="
              h-12 md:h-12 w-full rounded-lg border border-black/15 bg-willow-input
              px-4 outline-none focus:ring-2 focus:ring-willow-ring
            "
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email Address"
            className="
              h-12 md:h-12 w-full rounded-lg border border-black/15 bg-willow-input
              px-4 outline-none focus:ring-2 focus:ring-willow-ring
            "
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="
              h-12 md:h-12 rounded-lg bg-willow-accent text-white
              hover:bg-willow-accentHover transition
              disabled:opacity-70
            "
          >
            {status === "loading" ? "Submitting…" : "Join the Waitlist for Early Access"}
          </button>
        </form>

        {/* Inline feedback keeps spacing consistent */}
        <div className="mt-3 min-h-[1.25rem] text-center text-sm">
          {status === "ok" && (
            <span className="text-green-700">Thanks! You’re on the list.</span>
          )}
          {status === "error" && (
            <span className="text-red-700">Something went wrong. Try again.</span>
          )}
        </div>
      </div>
    </main>
  );
}