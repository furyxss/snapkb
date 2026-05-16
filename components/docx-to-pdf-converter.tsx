"use client";

import { ChangeEvent, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { renderAsync } from "docx-preview";
import html2canvas from "html2canvas";

type DocxFile = {
  arrayBuffer: ArrayBuffer;
  fileName: string;
  fileSize: number;
  pageCount: number;
};

type RenderedPage = {
  element: HTMLElement;
  estimatedPages: number;
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

async function waitForLayout() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

export function DocxToPdfConverter() {
  const renderRef = useRef<HTMLDivElement>(null);
  const [docxFile, setDocxFile] = useState<DocxFile | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);

  function getRenderedPages() {
    if (!renderRef.current) {
      throw new Error("Could not initialize the document renderer.");
    }

    const sections = Array.from(
      renderRef.current.querySelectorAll<HTMLElement>(".docx-export-wrapper > section"),
    );
    const fallback = Array.from(renderRef.current.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    const rawPages = sections.length ? sections : fallback;

    return rawPages.map((element) => {
      const width = Math.max(1, element.scrollWidth || element.offsetWidth);
      const height = Math.max(1, element.scrollHeight || element.offsetHeight);
      const a4HeightForWidth = width * (297 / 210);

      return {
        element,
        estimatedPages: Math.max(1, Math.ceil(height / a4HeightForWidth)),
      };
    });
  }

  async function renderHiddenDocument(arrayBuffer: ArrayBuffer): Promise<RenderedPage[]> {
    if (!renderRef.current) {
      throw new Error("Could not initialize the document renderer.");
    }

    renderRef.current.innerHTML = "";
    await renderAsync(arrayBuffer.slice(0), renderRef.current, undefined, {
      breakPages: true,
      className: "docx-export",
      inWrapper: true,
      ignoreFonts: false,
      ignoreHeight: false,
      ignoreWidth: false,
      renderChanges: false,
      renderComments: false,
      renderFooters: true,
      renderHeaders: true,
    });
    await waitForLayout();

    return getRenderedPages();
  }

  function countEstimatedPages(pages: RenderedPage[]) {
    return pages.reduce((total, page) => total + page.estimatedPages, 0);
  }

  async function addRenderedPageToPdf({
    pdf,
    element,
    isFirstPage,
    pageNumber,
    totalPages,
    scale,
  }: {
    pdf: jsPDF;
    element: HTMLElement;
    isFirstPage: boolean;
    pageNumber: number;
    totalPages: number;
    scale: number;
  }) {
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imageHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageSlices = Math.max(1, Math.ceil(imageHeight / pdfHeight));

    for (let slice = 0; slice < pageSlices; slice += 1) {
      setProgress(`Exporting page ${pageNumber + slice} of ${totalPages}...`);

      if (!isFirstPage || slice > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.95),
        "JPEG",
        0,
        -(slice * pdfHeight),
        pdfWidth,
        imageHeight,
      );
    }

    return pageSlices;
  }

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
      setProgress("Preparing document...");
      setDocxFile(null);

      const arrayBuffer = await file.arrayBuffer();
      const pages = await renderHiddenDocument(arrayBuffer);

      setDocxFile({
        arrayBuffer,
        fileName: stripDocxExtension(file.name),
        fileSize: file.size,
        pageCount: Math.max(1, countEstimatedPages(pages)),
      });
      setProgress("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this DOCX file.");
      setProgress("");
    } finally {
      setIsReading(false);
      event.target.value = "";
    }
  }

  async function exportPdf() {
    if (!docxFile || !renderRef.current) {
      return;
    }

    try {
      setIsExporting(true);
      setError(null);
      setProgress("Rendering pages...");

      const pages = await renderHiddenDocument(docxFile.arrayBuffer);
      if (!pages.length) {
        throw new Error("No pages were found in this DOCX file.");
      }

      const pdf = new jsPDF("p", "pt", "a4");
      const scale = Math.min(2, window.devicePixelRatio || 1.5);
      const totalPages = Math.max(1, countEstimatedPages(pages));
      let exportedPages = 0;

      for (let index = 0; index < pages.length; index += 1) {
        const addedPages = await addRenderedPageToPdf({
          pdf,
          element: pages[index].element,
          isFirstPage: exportedPages === 0,
          pageNumber: exportedPages + 1,
          totalPages,
          scale,
        });
        exportedPages += addedPages;
      }

      pdf.save(`${docxFile.fileName}.pdf`);
      setProgress("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not export the PDF.");
      setProgress("");
    } finally {
      setIsExporting(false);
    }
  }

  const isBusy = isReading || isExporting;

  return (
    <section className="product-card relative rounded-[2.5rem] p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5 rounded-[2rem] bg-white/70 p-5 sm:p-7">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-accentSoft px-3 py-1 text-sm font-black text-orange-700">
              DOCX to PDF converter
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              Upload DOCX, export PDF. No giant document preview.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              SnapKB renders the document privately in a hidden workspace, captures each page, and
              builds a PDF. The page stays clean even when your DOCX has dozens of pages.
            </p>
          </div>

          <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto">
            {isReading ? "Reading DOCX..." : docxFile ? "Choose another DOCX" : "Choose DOCX file"}
            <input
              className="hidden"
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              disabled={isBusy}
            />
          </label>

          <div className="grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Hidden rendering
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Multi-page PDF
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              No server upload
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900">
            This version preserves layout better than text-only conversion, but exact Word fidelity
            still requires a server-side LibreOffice or Microsoft Word conversion engine.
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border)] bg-ink p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
              Conversion desk
            </p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-300">
              A4 PDF
            </span>
          </div>

          {!docxFile ? (
            <div className="mt-4 rounded-[1.5rem] border border-dashed border-white/20 bg-white/10 px-5 py-12 text-center text-sm leading-7 text-slate-300">
              Choose a DOCX file. SnapKB will prepare it in the background and show a download
              button here.
            </div>
          ) : (
            <div className="mt-4 space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    File
                  </p>
                  <p className="mt-2 truncate text-sm font-bold text-white">{docxFile.fileName}.docx</p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Size
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{formatBytes(docxFile.fileSize)}</p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Pages
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{docxFile.pageCount}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-white/10 p-5">
                <div className="flex items-center justify-between gap-3 text-sm text-slate-200">
                  <span>Status</span>
                  <span className="font-bold text-emerald-200">
                    {progress || "Ready to export"}
                  </span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-accent transition-all ${
                      isBusy ? "w-2/3 animate-pulse" : "w-full"
                    }`}
                  />
                </div>
              </div>

              <button
                className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-4 text-sm font-black text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={exportPdf}
                disabled={isBusy}
              >
                {isExporting ? "Exporting PDF..." : "Download PDF"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="docx-hidden-renderer pointer-events-none fixed left-[-10000px] top-0 -z-10 bg-white opacity-0"
      >
        <div ref={renderRef} />
      </div>
    </section>
  );
}
