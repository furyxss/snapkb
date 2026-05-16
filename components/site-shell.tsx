import Link from "next/link";
import { ReactNode } from "react";

export function SiteShell({
  children,
  eyebrow,
  title,
  intro,
  panelTitle = "Why this tool hub converts",
  panelItems = [
    "Users come in with specific jobs to finish, not broad software research.",
    "Single-purpose tools are fast to explain, fast to use, and easy to expand.",
    "Each tool can rank for a clear keyword while the hub strengthens the whole site.",
  ],
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
  panelTitle?: string;
  panelItems?: string[];
}) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-ink">
          SnapKB
        </Link>
        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-700">
          <Link href="/#tools">Tools</Link>
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
              {panelTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {panelItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {children}
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-[color:var(--border)] px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>SnapKB is growing into a lightweight online toolbox for image and file tasks.</p>
        <div className="flex items-center gap-4">
          <Link href="/terms-of-service">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
