import Link from "next/link";
import { ReactNode } from "react";

export function SiteShell({
  children,
  eyebrow,
  title,
  intro,
  primaryCtaHref = "/#compressor",
  primaryCtaLabel = "Compress an image",
  secondaryCtaHref = "/compress-image-to-100kb",
  secondaryCtaLabel = "Try 100KB preset",
  panelTitle = "Why people use SnapKB",
  panelItems = [
    "Fast tools for real upload and file-size problems.",
    "Browser-based workflows for better privacy and lower friction.",
    "Useful utilities for forms, resumes, websites, and creator tasks.",
  ],
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  panelTitle?: string;
  panelItems?: string[];
}) {
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-[#fffaf3]/82 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-sm font-black text-white shadow-crisp">
              KB
            </span>
            <span>SnapKB</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
            <Link className="transition hover:text-ink" href="/">工具箱</Link>
            <Link className="transition hover:text-ink" href="/generate-er-diagram">ER图</Link>
            <Link className="transition hover:text-ink" href="/generate-sequence-diagram">时序图</Link>
            <Link className="transition hover:text-ink" href="/generate-flowchart">流程图</Link>
            <Link className="transition hover:text-ink" href="/generate-architecture-diagram">架构图</Link>
            <Link className="transition hover:text-ink" href="/generate-use-case-diagram">用例图</Link>
          </nav>
          <Link
            href="/"
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-crisp transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            返回首页
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="relative grid gap-10 pb-12 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-16 lg:pt-20">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/72 px-4 py-2 text-sm font-bold text-orange-700 shadow-crisp">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {eyebrow}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.065em] text-ink sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">{intro}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5 hover:brightness-95"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white/75 px-6 py-4 text-sm font-black text-ink shadow-crisp transition hover:-translate-y-0.5 hover:bg-white"
              >
                {secondaryCtaLabel}
              </Link>
            </div>
            <div className="grid max-w-2xl gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-3">
              <div className="rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3">
                Local browser processing
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3">
                JPG, PNG, WebP
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white/70 px-4 py-3">
                No account required
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="hero-orb absolute -right-12 -top-10 h-40 w-40 rounded-full opacity-90 blur-[1px]" />
            <div className="product-card relative rounded-[2.5rem] p-4 sm:p-5">
              <div className="rounded-[2rem] bg-ink p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-200">
                      Diagram workspace
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">图表实时生成预览</h2>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-bold text-emerald-200">
                    在线生成
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["工具数", "7 个"],
                    ["格式", "SVG"],
                    ["方式", "实时预览"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{label}</p>
                      <p className="mt-2 text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-[#fdf6e9] p-4 text-ink">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-500">
                    <span>生成方式</span>
                    <span>Mermaid</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[82%] rounded-full bg-accent" />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-crisp">
                      <p className="text-sm font-bold text-slate-500">适合</p>
                      <p className="mt-1 text-lg font-black">需求梳理与设计说明</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-crisp">
                      <p className="text-sm font-bold text-slate-500">输出</p>
                      <p className="mt-1 text-lg font-black">可复制可下载</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-[2rem] border border-[color:var(--border)] bg-white/80 p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  {panelTitle}
                </p>
                <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
                  {panelItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {children}

        <footer className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] py-8 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between">
          <p>SnapKB 是一个在线图片生成工具箱，支持常见结构图、流程图和分析图生成。</p>
          <div className="flex items-center gap-4">
            <Link href="/terms-of-service">条款</Link>
            <Link href="/privacy-policy">隐私</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
