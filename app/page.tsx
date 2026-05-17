import { AdsenseAd } from "@/components/adsense-ad";
import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

const tools = [
  {
    name: "Compress to target size",
    description: "Set any KB target and export an upload-ready JPG, PNG, or WebP image.",
    href: "/#compressor",
    status: "Live",
    metric: "Custom KB",
  },
  {
    name: "Compress to 100KB",
    description: "A practical preset for forms, resumes, profile photos, and CMS uploads.",
    href: "/compress-image-to-100kb",
    status: "Live",
    metric: "100 KB",
  },
  {
    name: "Compress to 50KB",
    description: "A stricter preset for old portals, small thumbnails, and tight upload caps.",
    href: "/compress-image-to-50kb",
    status: "Live",
    metric: "50 KB",
  },
  {
    name: "DOCX to PDF",
    description: "Convert Word documents into downloadable PDF files with a browser preview.",
    href: "/docx-to-pdf",
    status: "Live",
    metric: "PDF",
  },
  {
    name: "PNG to JPG",
    description: "Convert large transparent-free PNG files into lighter, easier-to-upload JPGs.",
    href: "/png-to-jpg",
    status: "Live",
    metric: "Convert",
  },
  {
    name: "Batch compression",
    description: "Compress multiple product images or profile assets in a single focused session.",
    href: "#roadmap",
    status: "Planned",
    metric: "Bulk",
  },
];

const useCases = [
  "Job portals and resume forms",
  "Marketplace product photos",
  "CMS and blog image uploads",
  "Profile photos and ID-style submissions",
];

export default function Home() {
  return (
    <SiteShell
      eyebrow="Private image compression, built for real upload limits"
      title="Make images pass upload limits without the usual friction."
      intro="SnapKB is a focused image utility workspace for shrinking files to exact KB targets, previewing the result, and downloading an upload-ready image in seconds."
      primaryCtaLabel="Start compressing"
      secondaryCtaLabel="Open 50KB tool"
      secondaryCtaHref="/compress-image-to-50kb"
      panelTitle="Product promise"
      panelItems={[
        "Your image is processed in the browser for the core compression flow.",
        "Targets are designed around real form, profile, resume, and website limits.",
        "The interface stays focused on finishing the upload task, not editing everything.",
      ]}
    >
      <section className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["No signup", "Open the tool and finish the task immediately."],
          ["Privacy-first", "Compression runs locally in your browser."],
          ["Target sizes", "Use 50KB, 100KB, or your own custom value."],
          ["Mobile ready", "Works for quick fixes from desktop or phone."],
        ].map(([title, copy]) => (
          <div key={title} className="product-card rounded-[1.75rem] p-5">
            <p className="text-lg font-black tracking-tight text-ink">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
          </div>
        ))}
      </section>

      <section id="compressor" className="py-10">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Core product
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">
              The compression workspace
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Choose a target size, upload an image, compare the output, then download the compressed
            file. No multi-step wizard, no account wall.
          </p>
        </div>
        <ImageCompressor
          title="Compress an image to the exact KB target you need"
          description="Upload a JPG, PNG, or WebP file and SnapKB will reduce it directly in your browser."
        />
      </section>

      <AdsenseAd
        slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT}
        className="py-4"
        format="auto"
      />

      <section id="tools" className="py-12">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Tool suite
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">
              One small toolbox for upload-ready images
            </h2>
          </div>
          <Link
            href="/#compressor"
            className="inline-flex w-fit rounded-full bg-ink px-5 py-3 text-sm font-black text-white shadow-crisp transition hover:-translate-y-0.5"
          >
            Use the live compressor
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="group product-card flex min-h-64 flex-col justify-between rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-orange-700">
                    {tool.status}
                  </span>
                  <span className="text-sm font-black text-slate-400">{tool.metric}</span>
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-ink">
                  {tool.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
              </div>
              <Link
                href={tool.href}
                className="mt-7 inline-flex w-fit rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition group-hover:bg-accent"
              >
                {tool.status === "Live" ? "Open tool" : "Preview roadmap"}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="product-card rounded-[2.25rem] p-7">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Use cases
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ink">
            Built for the tiny upload problems that waste real time
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            SnapKB is intentionally narrow: it helps people make files accepted by forms, portals,
            marketplaces, CMS tools, and everyday workflows.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((item, index) => (
            <div key={item} className="product-card rounded-[1.75rem] p-5">
              <span className="text-sm font-black text-orange-600">0{index + 1}</span>
              <p className="mt-4 text-xl font-black tracking-tight text-ink">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="grid gap-6 py-12 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2.25rem] bg-ink p-7 text-white shadow-float">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-200">
            Roadmap
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            Next: resize, convert, crop, and batch workflows
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The product direction is a compact suite of practical image utilities, with each tool
            built around a clear upload or publishing job.
          </p>
        </div>

        <div className="product-card rounded-[2.25rem] p-7">
          <div className="grid gap-4">
            {[
              "Resize by width, height, or platform preset",
              "Convert JPG and WebP formats",
              "Crop profile and document-style photos",
              "Batch compress images for creators and operators",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[color:var(--border)] bg-white/72 px-5 py-4 text-sm font-bold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoCopy
        heading="How to use SnapKB"
        steps={[
          "Choose a target size or open a preset page like 50KB or 100KB.",
          "Upload a JPG, PNG, or WebP image from your device.",
          "Preview the compressed result and compare the file size.",
          "Download the optimized image and use it in your form, website, or profile.",
        ]}
        faq={[
          {
            question: "Does SnapKB upload my image to a server?",
            answer:
              "The current compression workflow runs in the browser, so the core file processing can happen locally on your device.",
          },
          {
            question: "Can SnapKB hit exactly 100KB or 50KB?",
            answer:
              "It tries to get as close as possible while keeping the image usable. Some source images may land slightly above or below the target.",
          },
          {
            question: "What makes this different from a full photo editor?",
            answer:
              "SnapKB is built for one job: making images upload-ready quickly. It avoids heavyweight editing controls unless they help finish that task.",
          },
        ]}
      />
    </SiteShell>
  );
}
