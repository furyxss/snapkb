"use client";

import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from "react";

type ToolMode = "blur" | "cover";

type ImageState = {
  fileName: string;
  originalBytes: number;
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
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not decode the selected image."));
    image.src = src;
  });
}

export function ImageMarkCleaner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [mode, setMode] = useState<ToolMode>("blur");
  const [brushSize, setBrushSize] = useState("48");
  const [coverColor, setCoverColor] = useState("#ffffff");
  const [isDrawing, setIsDrawing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  function getCanvasPoint(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function applyBrush(x: number, y: number) {
    const canvas = canvasRef.current;
    const sourceCanvas = sourceCanvasRef.current;
    const context = canvas?.getContext("2d");
    const sourceContext = sourceCanvas?.getContext("2d");
    const size = Number(brushSize);

    if (!canvas || !sourceCanvas || !context || !sourceContext || !Number.isFinite(size)) {
      return;
    }

    const radius = Math.max(8, size);
    const left = Math.max(0, x - radius);
    const top = Math.max(0, y - radius);
    const width = Math.min(radius * 2, canvas.width - left);
    const height = Math.min(radius * 2, canvas.height - top);

    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.clip();

    if (mode === "blur") {
      context.filter = "blur(14px)";
      context.drawImage(sourceCanvas, left, top, width, height, left, top, width, height);
      context.filter = "none";
    } else {
      context.fillStyle = coverColor;
      context.fillRect(left, top, width, height);
    }

    context.restore();
    setDownloadUrl(null);
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      event.target.value = "";
      return;
    }

    try {
      setError(null);
      setDownloadUrl(null);

      const dataUrl = await fileToDataUrl(file);
      const image = await loadImage(dataUrl);
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (!canvas || !context) {
        throw new Error("Could not initialize the image editor.");
      }

      canvas.width = image.width;
      canvas.height = image.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = image.width;
      sourceCanvas.height = image.height;
      sourceCanvas.getContext("2d")?.drawImage(image, 0, 0);
      sourceCanvasRef.current = sourceCanvas;

      setImageState({
        fileName: file.name.replace(/\.[^.]+$/, "") || "cleaned-image",
        originalBytes: file.size,
        width: image.width,
        height: image.height,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load this image.");
    } finally {
      event.target.value = "";
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    const point = getCanvasPoint(event);
    if (!point || !imageState) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDrawing(true);
    applyBrush(point.x, point.y);
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing || !imageState) {
      return;
    }

    const point = getCanvasPoint(event);
    if (point) {
      applyBrush(point.x, point.y);
    }
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function resetImage() {
    const canvas = canvasRef.current;
    const sourceCanvas = sourceCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !sourceCanvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sourceCanvas, 0, 0);
    setDownloadUrl(null);
  }

  function prepareDownload() {
    const canvas = canvasRef.current;
    if (!canvas || !imageState) {
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Could not export the edited image.");
        return;
      }

      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  }

  return (
    <section className="product-card rounded-[2.5rem] p-4 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-5 rounded-[2rem] bg-white/70 p-5 sm:p-7">
          <div className="space-y-3">
            <p className="inline-flex rounded-full bg-accentSoft px-3 py-1 text-sm font-black text-orange-700">
              Image mark cleaner
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">
              Cover logos, text, and private marks on images you own
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              Upload an image, paint over the area you want to clean, then export a PNG. Use this
              for your own images, screenshots, and private information cleanup.
            </p>
          </div>

          <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5 hover:brightness-95 sm:w-auto">
            Choose image
            <input
              className="hidden"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
            />
          </label>

          <div className="grid gap-4 rounded-[1.75rem] border border-[color:var(--border)] bg-cream p-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-700">Cleanup mode</span>
              <select
                className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-black text-ink outline-none"
                value={mode}
                onChange={(event) => setMode(event.target.value as ToolMode)}
              >
                <option value="blur">Blur area</option>
                <option value="cover">Cover with color</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-700">Brush size</span>
              <input
                className="w-full accent-orange-600"
                type="range"
                min="12"
                max="120"
                value={brushSize}
                onChange={(event) => setBrushSize(event.target.value)}
              />
            </label>

            <label className="space-y-2">
              <span className="block text-sm font-bold text-slate-700">Cover color</span>
              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3">
                <input
                  className="h-8 w-10 cursor-pointer border-0 bg-transparent"
                  type="color"
                  value={coverColor}
                  onChange={(event) => setCoverColor(event.target.value)}
                />
                <span className="text-sm font-black uppercase tracking-wide text-slate-500">
                  {coverColor}
                </span>
              </div>
            </label>

            <div className="flex items-end gap-3">
              <button
                className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-black text-ink transition hover:bg-slate-50"
                type="button"
                onClick={resetImage}
                disabled={!imageState}
              >
                Reset
              </button>
              <button
                className="rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
                type="button"
                onClick={prepareDownload}
                disabled={!imageState}
              >
                Prepare download
              </button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-900">
            Only edit images you own or have permission to modify. This tool is for legitimate
            cleanup, privacy redaction, and correcting your own image assets.
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
              Editing canvas
            </p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-300">
              Local
            </span>
          </div>

          {imageState ? (
            <div className="mt-4 space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Size
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    {imageState.width} x {imageState.height}
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Original
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    {formatBytes(imageState.originalBytes)}
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    Output
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">PNG</p>
                </div>
              </div>

              <div className="overflow-auto rounded-[1.5rem] border border-white/15 bg-slate-100 p-3">
                <canvas
                  ref={canvasRef}
                  className="mx-auto block max-h-[620px] max-w-full touch-none rounded-xl bg-white object-contain"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={stopDrawing}
                  onPointerCancel={stopDrawing}
                  onPointerLeave={stopDrawing}
                />
              </div>

              {downloadUrl ? (
                <a
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-5 py-4 text-sm font-black text-white transition hover:brightness-95"
                  href={downloadUrl}
                  download={`${imageState.fileName}-cleaned.png`}
                >
                  Download cleaned image
                </a>
              ) : (
                <p className="rounded-[1.5rem] bg-white/10 px-4 py-4 text-sm leading-7 text-slate-300">
                  Paint over marks, then click Prepare download to create the export file.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4 rounded-[1.5rem] border border-dashed border-white/20 bg-white/10 px-5 py-12 text-center text-sm leading-7 text-slate-300">
              Upload one image to start painting over text, logos, or private marks.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
