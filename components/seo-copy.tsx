export function SeoCopy({
  heading,
  steps,
  faq,
}: {
  heading: string;
  steps: string[];
  faq: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{heading}</h2>
        <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">FAQ</h2>
        <div className="mt-5 space-y-4">
          {faq.map((item) => (
            <article
              key={item.question}
              className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-4"
            >
              <h3 className="text-base font-semibold text-ink">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
