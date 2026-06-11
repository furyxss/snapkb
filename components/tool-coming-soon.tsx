import Link from "next/link";

export function ToolComingSoon({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {category}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">{description}</p>
      </div>

      <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Status
        </p>
        <div className="mt-4 rounded-[1.5rem] border border-dashed border-[color:var(--border)] bg-white px-5 py-8">
          <p className="text-lg font-semibold text-ink">This tool page is ready for rollout.</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            The homepage card already links here, so you can ship the actual function later
            without redesigning the toolbox.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Back to toolbox
            </Link>
            <Link
              href="/compress-image-to-100kb"
              className="inline-flex rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white"
            >
              Open working tool
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
