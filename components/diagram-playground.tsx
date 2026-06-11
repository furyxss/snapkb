"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

type DiagramPlaygroundProps = {
  title: string;
  description: string;
  mermaidType: string;
  template: string;
  tips: string[];
};

let mermaidReady = false;

function ensureMermaid() {
  if (!mermaidReady) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "default",
      fontFamily: "Arial, Helvetica, sans-serif",
      flowchart: {
        htmlLabels: true,
        curve: "basis",
      },
    });
    mermaidReady = true;
  }
}

function sanitizeId() {
  return `diagram-${Math.random().toString(36).slice(2, 10)}`;
}

export function DiagramPlayground({
  title,
  description,
  mermaidType,
  template,
  tips,
}: DiagramPlaygroundProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState(template);
  const [prompt, setPrompt] = useState("");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        ensureMermaid();
        const { svg: renderedSvg } = await mermaid.render(sanitizeId(), source);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (renderError) {
        if (!cancelled) {
          setError(renderError instanceof Error ? renderError.message : "图表渲染失败。");
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [source]);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = svg;
    }
  }, [svg]);

  async function handleCopy() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  async function handleGenerate() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setError("请先输入你的图表需求。");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");

      const response = await fetch("/api/generate-diagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolTitle: title,
          mermaidType,
          template,
          userPrompt: trimmedPrompt,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "生成失败。");
      }

      if (!data?.mermaid || typeof data.mermaid !== "string") {
        throw new Error("AI 没有返回有效 Mermaid 代码。");
      }

      setSource(data.mermaid);
    } catch (generateError) {
      setError(generateError instanceof Error ? generateError.message : "生成失败。");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleDownloadSvg() {
    if (!svg) {
      return;
    }

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="product-card rounded-[2rem] p-6">
        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 p-4">
          <p className="text-sm font-black text-ink">自然语言一键生成</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            直接描述你要的图，AI 会帮你生成 Mermaid 代码并自动预览。
          </p>
          <textarea
            className="mt-4 min-h-[120px] w-full resize-y rounded-[1rem] border border-[color:var(--border)] bg-[#faf8ff] px-4 py-3 text-sm leading-7 text-slate-800 outline-none"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={`例如：帮我生成一个${title}，描述用户下单、支付、发货、完成签收的全过程。`}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="rounded-full bg-[#7c3aed] px-5 py-3 text-sm font-black text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "AI 生成中..." : "AI 一键生成"}
            </button>
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-slate-50"
            >
              清空描述
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 p-4">
          <textarea
            className="min-h-[420px] w-full resize-y border-0 bg-transparent font-mono text-sm leading-7 text-slate-800 outline-none"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            {copied ? "已复制代码" : "复制代码"}
          </button>
          <button
            type="button"
            onClick={handleDownloadSvg}
            className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-slate-50"
          >
            下载 SVG
          </button>
          <button
            type="button"
            onClick={() => setSource(template)}
            className="rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-black text-ink transition hover:bg-slate-50"
          >
            恢复模板
          </button>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 p-4">
          <p className="text-sm font-black text-ink">快速提示</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tips.map((tip) => (
              <span
                key={tip}
                className="rounded-full bg-[#fff5ea] px-3 py-2 text-xs font-bold text-slate-700"
              >
                {tip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-ink p-5 text-white shadow-float">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">实时预览</p>
        {error ? (
          <div className="mt-4 rounded-[1.5rem] border border-red-300/30 bg-red-400/10 px-5 py-4 text-sm leading-7 text-red-100">
            {error}
          </div>
        ) : null}

        <div className="mt-4 rounded-[1.5rem] bg-white p-5 text-slate-900">
          <div
            ref={previewRef}
            className="diagram-preview min-h-[540px] overflow-auto rounded-[1rem] bg-white"
          />
        </div>
      </div>
    </section>
  );
}
