"use client";

import { ChangeEvent, useMemo, useState } from "react";

type CompressionResult = {
  originalUrl: string;
  compressedUrl: string;
  originalBytes: number;
  compressedBytes: number;
  targetBytes: number;
  width: number;
  height: number;
  format: string;
};

const MAX_DIMENSION = 2400;
const MIN_QUALITY = 0.4;
const QUALITY_STEP = 0.06;

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

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not decode the image."));
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export the compressed image."));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function compressImage(file: File, targetBytes: number) {
  const originalUrl = await fileToDataUrl(file);
  const image = await loadImage(originalUrl);

  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not initialize the image compressor.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  const targetType = file.type === "image/png" ? "image/jpeg" : file.type || "image/jpeg";
  let quality = 0.92;
  let bestBlob = await canvasToBlob(canvas, targetType, quality);

  if (bestBlob.size <= targetBytes) {
    return {
      originalUrl,
      compressedBlob: bestBlob,
      width,
      height,
      format: targetType,
    };
  }

  while (quality > MIN_QUALITY) {
    quality = Number((quality - QUALITY_STEP).toFixed(2));
    const blob = await canvasToBlob(canvas, targetType, quality);

    if (blob.size <= targetBytes) {
      bestBlob = blob;
      break;
    }

    if (blob.size < bestBlob.size) {
      bestBlob = blob;
    }
  }

  return {
    originalUrl,
    compressedBlob: bestBlob,
    width,
    height,
    format: targetType,
  };
}

export function ImageCompressor({
  defaultTargetKb = 100,
  title = "Compress your image to a target size",
  description = "Upload a JPG, PNG, or WebP file and reduce it directly in your browser.",
}: {
  defaultTargetKb?: number;
  title?: string;
  description?: string;
}) {
  const [targetKb, setTargetKb] = useState(String(defaultTargetKb));
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const reductionText = useMemo(() => {
    if (!result) {
      return null;
    }

    const reduction = Math.max(
      0,
      Math.round((1 - result.compressedBytes / result.originalBytes) * 100),
    );

    return `${reduction}% smaller`;
  }, [result]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const parsedTarget = Math.max(5, Number(targetKb));
    if (!Number.isFinite(parsedTarget)) {
      setError("Please enter a valid target size in KB.");
      return;
    }

    try {
      setIsWorking(true);
      setError(null);
      setResult(null);
      setFileName(file.name);

      const { originalUrl, compressedBlob, width, height, format } = await compressImage(
        file,
        parsedTarget * 1024,
      );

      setResult({
        originalUrl,
        compressedUrl: URL.createObjectURL(compressedBlob),
        originalBytes: file.size,
        compressedBytes: compressedBlob.size,
        targetBytes: parsedTarget * 1024,
        width,
        height,
        format,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed.");
    } finally {
      setIsWorking(false);
      event.target.value = "";
    }
  }

  return (
    <section className="product-card rounded-[2.5rem] p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 rounded-[2rem] bg-white/70 p-5 sm:p-7">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-accentSoft px-3 py-1 text-sm font-black text-orange-700">
              Browser-based image compression
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-700">{description}</p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[color:var(--border)] bg-cream p-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-700">Target file size</span>
              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3">
                <input
                  className="w-full border-0 bg-transparent text-lg font-black text-ink outline-none"
                  type="number"
                  min="5"
                  step="5"
                  value={targetKb}
                  onChange={(event) => setTargetKb(event.target.value)}
                />
                <span className="text-sm font-black uppercase tracking-wide text-slate-500">
                  KB
                </span>
              </div>
            </label>

            <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5 hover:brightness-95">
              {isWorking ? "Compressing..." : "Choose image"}
              <input
                className="hidden"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={isWorking}
              />
            </label>
          </div>

          <div className="grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              No upload required
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Supports JPG, PNG, WebP
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Works on desktop and mobile
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border)] bg-ink p-5 text-white">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">
            Results
          </p>

          {!result ? (
            <div className="mt-4 rounded-[1.5rem] border border-dashed border-white/20 bg-white/10 px-5 py-10 text-center text-sm leading-7 text-slate-300">
              Upload one image to see the original size, compressed size, and download button here.
            </div>
          ) : (
            <div className="mt-4 space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Original
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{formatBytes(result.originalBytes)}</p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Compressed
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{formatBytes(result.compressedBytes)}</p>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white/10 p-4 text-sm text-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <span>Target</span>
                  <span className="font-semibold">{formatBytes(result.targetBytes)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span>Image size</span>
                  <span className="font-semibold">
                    {result.width} x {result.height}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span>Reduction</span>
                  <span className="font-semibold text-emerald-200">{reductionText}</span>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border)]">
                {/* Blob previews are generated client-side, so a plain img tag keeps the MVP simple. */}
                <img
                  src={result.compressedUrl}
                  alt="Compressed preview"
                  className="block max-h-72 w-full object-contain bg-slate-50"
                />
              </div>

              <a
                className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-4 text-sm font-black text-white transition hover:brightness-95"
                href={result.compressedUrl}
                download={`compressed-${fileName || "image"}.jpg`}
              >
                Download compressed image
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
