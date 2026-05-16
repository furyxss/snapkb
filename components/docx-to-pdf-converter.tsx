"use client";

import { ChangeEvent, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import mammoth from "mammoth/mammoth.browser";
import html2canvas from "html2canvas";

type DocxResult = {
  html: string;
  messages: string[];
  fileName: string;
  fileSize: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[unitIndex]}`;
}

function stripDocxExtension(fileName: string) {
  return fileName.replace(/\.docx$/i, "") || "converted-document";
}

export function DocxToPdfConverter() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<DocxResult | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const isDocx =
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx");

    if (!isDocx) {
      setError("Please choose a .docx file.");
      event.target.value = "";
      return;
    }

    try {
      setIsReading(true);
      setError(null);
      setResult(null);

      const arrayBuffer = await file.arrayBuffer();
      const converted = await mammoth.convertToHtml({
        arrayBuffer,
      });

      setResult({
        html: converted.value || "<p>No readable document content was found.</p>",
        messages: converted.messages.map((message) => message.message),
        fileName: stripDocxExtension(file.name),
        fileSize: file.size,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this DOCX file.");
    } finally {
      setIsReading(false);
      event.target.value = "";
    }
  }

  async function exportPdf() {
    if (!previewRef.current || !result) {
      return;
    }

    try {
      setIsExporting(true);
      setError(null);

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        scale: Math.min(2, window.devicePixelRatio || 1.5),
        useCORS: true,
      });

      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let renderedHeight = 0;
      let pageIndex = 0;

      while (renderedHeight < imageHeight) {
        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          canvas.toDataURL("image/jpeg", 0.95),
          "JPEG",
          0,
          -renderedHeight,
          imageWidth,
          imageHeight,
        );

        renderedHeight += pageHeight;
        pageIndex += 1;
      }

      pdf.save(`${result.fileName}.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not export the PDF.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="product-card rounded-[2.5rem] p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5 rounded-[2rem] bg-white/70 p-5 sm:p-7">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-accentSoft px-3 py-1 text-sm font-black text-orange-700">
              DOCX to PDF converter
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              Convert Word documents into downloadable PDF files
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              Upload a .docx file, review the browser-rendered preview, then export it as a PDF.
              This is best for text-focused documents, resumes, notes, and simple reports.
            </p>
          </div>

          <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto">
            {isReading ? "Reading DOCX..." : "Choose DOCX file"}
            <input
              className="hidden"
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              disabled={isReading || isExporting}
            />
          </label>

          <div className="grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              DOCX input
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              PDF output
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Browser-based preview
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900">
            For exact Microsoft Word layout fidelity, a server-side LibreOffice/Word conversion
            engine is usually required. This browser version is designed for fast, private,
            text-focused conversions.
          </div>

          {result ? (
            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 p-4 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-3">
                <span>File</span>
                <span className="font-black text-ink">{result.fileName}.docx</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span>Original size</span>
                <span className="font-black text-ink">{formatBytes(result.fileSize)}</span>
              </div>
              <button
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-ink px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={exportPdf}
                disabled={isExporting}
              >
                {isExporting ? "Exporting PDF..." : "Download PDF"}
              </button>
            </div>
          ) : null}

          {result?.messages.length ? (
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 px-4 py-4 text-xs leading-6 text-slate-500">
              Some document features were simplified during preview: {result.messages.slice(0, 2).join("; ")}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border)] bg-ink p-4 text-white sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
              PDF preview
            </p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-300">
              A4
            </span>
          </div>

          <div className="mt-4 overflow-auto rounded-[1.5rem] bg-slate-200 p-3 sm:p-5">
            {result ? (
              <div
                ref={previewRef}
                className="docx-preview mx-auto min-h-[720px] w-full max-w-[794px] bg-white px-8 py-10 text-slate-900 shadow-crisp sm:px-12 sm:py-14"
                dangerouslySetInnerHTML={{ __html: result.html }}
              />
            ) : (
              <div className="mx-auto grid min-h-[520px] w-full max-w-[794px] place-items-center rounded-sm bg-white px-8 text-center text-sm leading-7 text-slate-500 shadow-crisp">
                Upload a DOCX file to generate a readable preview before exporting PDF.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
