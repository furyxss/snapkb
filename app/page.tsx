import { AdsenseAd } from "@/components/adsense-ad";
import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

const tools = [
  {
    name: "Custom Size Compressor",
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
    description: "Convert PNG files into lighter JPGs for forms, websites, and quick uploads.",
    href: "/png-to-jpg",
    status: "Live",
    metric: "Convert",
  },
  {
    name: "Clean image marks",
    description: "Blur or cover text, logos, and private details on images you own.",
    href: "/clean-image-marks",
    status: "Live",
    metric: "Clean",
  },
  {
    name: "Resize Image Dimensions",
    description: "Prepare width and height for platform-specific upload requirements.",
    href: "/tools/resize-image-dimensions",
    status: "Coming soon",
    metric: "Resize",
  },
  {
    name: "Passport Photo Crop",
    description: "Create upload-ready passport and profile photos with the right framing.",
    href: "/tools/passport-photo-crop",
    status: "Coming soon",
    metric: "Crop",
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
      eyebrow="Private image compression and lightweight file tools"
      title="Open the right tool and finish the upload job faster."
      intro="SnapKB now works like a practical toolbox for common file and image tasks. Jump into a dedicated tool page, or use the live compressor on the homepage when you need a custom target size."
      primaryCtaLabel="Start compressing"
      secondaryCtaLabel="Open PNG to JPG"
      secondaryCtaHref="/png-to-jpg"
      panelTitle="Product promise"
      panelItems={[
        "Your core image workflows run directly in the browser.",
        "Dedicated utility pages stay focused on one real job at a time.",
        "The homepage works like a toolbox instead of a generic marketing page.",
      ]}
    >
      <section className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["No signup", "Open the tool and finish the task immediately."],
          ["Privacy-first", "Core image processing runs locally in your browser."],
          ["Toolbox flow", "Choose 50KB, 100KB, PNG to JPG, DOCX to PDF, and more."],
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
              Featured tool
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">
              The live compression workspace
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
              Toolbox
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">
              Pick a tool and jump straight into the job
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
                {tool.status === "Live" ? "Open tool" : "View page"}
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
            SnapKB is intentionally practical: it helps people make files accepted by forms,
            portals, marketplaces, CMS tools, and everyday workflows.
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
            Next up
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            More dedicated utility pages can plug into the toolbox
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The homepage now behaves like a compact toolbox, so new utilities can be added as
            dedicated cards and pages without reworking the overall structure.
          </p>
        </div>

        <div className="product-card rounded-[2.25rem] p-7">
          <div className="grid gap-4">
            {[
              "Resize by width, height, or platform preset",
              "Crop passport and profile photos",
              "Add more conversion shortcuts for upload tasks",
              "Expand the toolbox without changing the homepage pattern",
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
          "Open a tool from the homepage toolbox or jump into the live compressor.",
          "If you are compressing an image, choose the target size or preset you need.",
          "Preview the result and compare the file size before downloading.",
          "Download the optimized file and switch tools whenever the task changes.",
        ]}
        faq={[
          {
            question: "Does SnapKB upload my image to a server?",
            answer:
              "The current compression workflow runs in the browser, so the core file processing can happen locally on your device.",
          },
          {
            question: "Can I still use the dedicated 50KB and 100KB pages?",
            answer:
              "Yes. The toolbox homepage links into those dedicated pages so preset-based compression stays available.",
          },
          {
            question: "Why keep a live compressor on the homepage too?",
            answer:
              "The homepage compressor is the fastest option for custom KB targets, while dedicated tool pages like PNG to JPG or fixed presets are better for specific jobs.",
          },
        ]}
      />
    </SiteShell>
  );
}
