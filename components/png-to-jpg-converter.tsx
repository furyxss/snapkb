"use client";

import { ChangeEvent, useMemo, useState } from "react";

type ConvertResult = {
  originalBytes: number;
  jpgBytes: number;
  width: number;
  height: number;
  jpgUrl: string;
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

function canvasToJpgBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export the JPG file."));
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
    throw new Error("Could not initialize the converter.");
  }

  // JPG does not support transparency, so transparent pixels need a background.
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);

  return {
    jpgBlob: await canvasToJpgBlob(canvas, quality),
    width: image.width,
    height: image.height,
  };
}

export function PngToJpgConverter() {
  const [quality, setQuality] = useState("0.86");
  const [background, setBackground] = useState("#ffffff");
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savingsText = useMemo(() => {
    if (!result) {
      return null;
    }

    const reduction = Math.round((1 - result.jpgBytes / result.originalBytes) * 100);
    if (reduction > 0) {
      return `${reduction}% smaller`;
    }

    return `${Math.abs(reduction)}% larger`;
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

    const parsedQuality = Number(quality);
    if (!Number.isFinite(parsedQuality) || parsedQuality < 0.1 || parsedQuality > 1) {
      setError("Please choose a JPG quality between 0.1 and 1.");
      event.target.value = "";
      return;
    }

    try {
      setIsWorking(true);
      setError(null);
      setResult(null);
      setFileName(file.name.replace(/\.png$/i, ""));

      const { jpgBlob, width, height } = await convertPngToJpg(
        file,
        parsedQuality,
        background,
      );

      setResult({
        originalBytes: file.size,
        jpgBytes: jpgBlob.size,
        width,
        height,
        jpgUrl: URL.createObjectURL(jpgBlob),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "PNG to JPG conversion failed.");
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
              Convert transparent-free PNG files into upload-friendly JPGs
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              Choose a PNG, set the JPG quality, pick the background used for transparent pixels,
              and download a clean JPG export.
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[color:var(--border)] bg-cream p-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-700">JPG quality</span>
              <select
                className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-black text-ink outline-none"
                value={quality}
                onChange={(event) => setQuality(event.target.value)}
              >
                <option value="0.92">High quality</option>
                <option value="0.86">Balanced</option>
                <option value="0.72">Smaller file</option>
              </select>
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
              JPG output
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
                    JPG output
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{formatBytes(result.jpgBytes)}</p>
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
                  <span>Size change</span>
                  <span className="font-semibold text-emerald-200">{savingsText}</span>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-white">
                {/* Blob previews are generated client-side, so a plain img tag keeps the tool simple. */}
                <img
                  src={result.jpgUrl}
                  alt="Converted JPG preview"
                  className="block max-h-72 w-full object-contain bg-slate-50"
                />
              </div>

              <a
                className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-4 text-sm font-black text-white transition hover:brightness-95"
                href={result.jpgUrl}
                download={`${fileName || "converted-image"}.jpg`}
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
