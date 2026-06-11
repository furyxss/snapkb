"use client";

import { ChangeEvent, useMemo, useState } from "react";

type ConversionResult = {
  originalUrl: string;
  convertedUrl: string;
  originalBytes: number;
  convertedBytes: number;
  width: number;
  height: number;
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

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected PNG file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not decode the PNG image."));
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export the JPG image."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

async function convertPngToJpg(file: File, quality: number, background: string) {
  const originalUrl = await fileToDataUrl(file);
  const image = await loadImage(originalUrl);

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not initialize the PNG to JPG converter.");
  }

  // JPG does not support transparency, so transparent areas need a solid background.
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const convertedBlob = await canvasToBlob(canvas, quality);

  return {
    originalUrl,
    convertedBlob,
    width: image.width,
    height: image.height,
  };
}

function toJpgDownloadName(fileName: string) {
  return fileName.replace(/\.png$/i, "") + ".jpg";
}

export function PngToJpgConverter() {
  const [quality, setQuality] = useState(88);
  const [background, setBackground] = useState("#ffffff");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const savingText = useMemo(() => {
    if (!result) {
      return null;
    }

    const reduction = Math.round((1 - result.convertedBytes / result.originalBytes) * 100);
    if (reduction > 0) {
      return `${reduction}% smaller`;
    }

    if (reduction < 0) {
      return `${Math.abs(reduction)}% larger`;
    }

    return "Same size";
  }, [result]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.type !== "image/png") {
      setError("Please choose a PNG file.");
      event.target.value = "";
      return;
    }

    try {
      setIsWorking(true);
      setError(null);
      setResult(null);
      setFileName(file.name);

      const { originalUrl, convertedBlob, width, height } = await convertPngToJpg(
        file,
        quality / 100,
        background,
      );

      setResult({
        originalUrl,
        convertedUrl: URL.createObjectURL(convertedBlob),
        originalBytes: file.size,
        convertedBytes: convertedBlob.size,
        width,
        height,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    } finally {
      setIsWorking(false);
      event.target.value = "";
    }
  }

  return (
    <section className="product-card rounded-[2.5rem] p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5 rounded-[2rem] bg-white/70 p-5 sm:p-7">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-accentSoft px-3 py-1 text-sm font-black text-orange-700">
              PNG to JPG converter
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              Convert PNG images into upload-friendly JPG files
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              Choose a PNG, set the JPG quality, decide which background fills transparent pixels,
              and download a clean JPG export directly in your browser.
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[color:var(--border)] bg-cream p-5 sm:grid-cols-2">
            <label className="space-y-3">
              <span className="block text-sm font-bold text-slate-700">JPG quality</span>
              <input
                className="w-full accent-[color:var(--accent)]"
                type="range"
                min="60"
                max="95"
                step="1"
                value={quality}
                onChange={(event) => setQuality(Number(event.target.value))}
              />
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Smaller file</span>
                <span className="font-bold text-ink">{quality}%</span>
                <span>Better detail</span>
              </div>
            </label>

            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-700">Transparency background</span>
              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3">
                <input
                  className="h-8 w-10 cursor-pointer border-0 bg-transparent"
                  type="color"
                  value={background}
                  onChange={(event) => setBackground(event.target.value)}
                />
                <span className="text-sm font-black uppercase tracking-wide text-slate-500">
                  {background}
                </span>
              </div>
            </label>
          </div>

          <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto">
            {isWorking ? "Converting..." : "Choose PNG file"}
            <input
              className="hidden"
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              disabled={isWorking}
            />
          </label>

          <div className="grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              PNG input only
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Transparent areas become your chosen background
            </div>
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/80 px-4 py-3">
              Local browser conversion
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
            JPG export
          </p>

          {!result ? (
            <div className="mt-4 rounded-[1.5rem] border border-dashed border-white/20 bg-white/10 px-5 py-10 text-center text-sm leading-7 text-slate-300">
              Select a PNG to see the output size, dimensions, preview, and download link.
            </div>
          ) : (
            <div className="mt-4 space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Original PNG
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{formatBytes(result.originalBytes)}</p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Converted JPG
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{formatBytes(result.convertedBytes)}</p>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white/10 p-4 text-sm text-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <span>Image size</span>
                  <span className="font-semibold">
                    {result.width} x {result.height}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span>Quality</span>
                  <span className="font-semibold">{quality}%</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span>Size change</span>
                  <span className="font-semibold text-emerald-200">{savingText}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-white">
                  <img
                    src={result.originalUrl}
                    alt="Original PNG preview"
                    className="block max-h-72 w-full object-contain bg-[linear-gradient(45deg,#f3f4f6_25%,#ffffff_25%,#ffffff_50%,#f3f4f6_50%,#f3f4f6_75%,#ffffff_75%,#ffffff_100%)] [background-size:24px_24px]"
                  />
                </div>
                <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-white">
                  <img
                    src={result.convertedUrl}
                    alt="Converted JPG preview"
                    className="block max-h-72 w-full object-contain bg-slate-50"
                  />
                </div>
              </div>

              <a
                className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-4 text-sm font-black text-white transition hover:brightness-95"
                href={result.convertedUrl}
                download={toJpgDownloadName(fileName || "image.png")}
              >
                Download JPG
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
