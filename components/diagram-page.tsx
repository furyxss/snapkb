import Link from "next/link";
import { DiagramPlayground } from "@/components/diagram-playground";
import type { DiagramTool } from "@/lib/diagram-tools";

export function DiagramPage({ tool }: { tool: DiagramTool }) {
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
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-orange-200 bg-white/75 px-4 py-2 text-sm font-bold text-orange-700 sm:inline-flex">
              {tool.shortTitle}
            </span>
            <Link
              href="/"
              className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-crisp transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              返回工具箱
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Diagram app
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">
              {tool.title}
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">{tool.description}</p>
        </div>

        <DiagramPlayground
          title={tool.title}
          description={tool.description}
          mermaidType={tool.mermaidType}
          template={tool.template}
          tips={tool.tips}
        />
      </main>
    </div>
  );
}
