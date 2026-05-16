import Link from "next/link";
import { ReactNode } from "react";

export function SiteShell({
  children,
  eyebrow,
  title,
  intro,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-ink">
          PixelPress
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link href="/compress-image-to-100kb">100KB</Link>
          <Link href="/compress-image-to-50kb">50KB</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">{intro}</p>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Why this tool converts
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>People search with clear intent: 20KB, 50KB, 100KB, and upload limits.</li>
              <li>No upload means fewer privacy concerns and lower hosting cost.</li>
              <li>The product is easy to explain, demo, and improve with SEO pages.</li>
            </ul>
          </div>
        </section>

        {children}
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-[color:var(--border)] px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>PixelPress compresses images in your browser to reduce privacy and infrastructure cost.</p>
        <div className="flex items-center gap-4">
          <Link href="/terms-of-service">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
