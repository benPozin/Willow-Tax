"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as { email?: string };
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
      {/* Content pushed up */}
      <div className="flex flex-col items-center text-center mt-6 md:mt-10">
        {/* Logo */}
        <Image
          src="/willowtax.png"
          alt="WillowTax"
          width={200}
          height={200}
          className="h-auto w-[140px] md:w-[180px] lg:w-[220px] mb-3"
          priority
        />

        {/* Badge */}
        <span className="mb-5 rounded-full bg-white/80 px-4 py-1 text-xs font-medium text-willow-text shadow">
          Coming Soon
        </span>

        {/* Headline */}
        <h1 className="font-bold tracking-tight text-3xl md:text-[3rem] max-w-3xl text-willow-text leading-snug">
          Stop Filling In Tax Slips
          <br className="hidden md:block" />
          Start Reducing Hours Now
        </h1>

        {/* Subheading */}
        <p className="mt-3 max-w-xl text-sm md:text-base text-neutral-700">
          Busy season made easy: Automatic slip entry, no typing required
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-6 flex w-full max-w-md flex-col sm:flex-row items-center gap-3 bg-white rounded-lg p-2 shadow"
        >
          <input
            required
            type="email"
            name="email"
            placeholder="Your email…"
            className="flex-1 rounded-md px-4 py-2 text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-willow-ring"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto rounded-md bg-willow-accent px-6 py-2 text-sm font-medium text-white shadow hover:bg-willow-accentHover transition disabled:opacity-70"
          >
            {status === "loading" ? "Joining…" : "Join the waitlist"}
          </button>
        </form>

        {/* Feedback */}
        <div className="mt-2 min-h-[1.25rem] text-sm">
          {status === "ok" && <span className="text-green-700">Thanks! You’re on the list.</span>}
          {status === "error" && <span className="text-red-700">Something went wrong. Try again.</span>}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-auto mb-6 text-center text-xs text-neutral-600">
        Built by tax preparers. <span className="font-semibold">Powered by AI.</span> Focused on you.
      </p>
    </main>
  );
}
