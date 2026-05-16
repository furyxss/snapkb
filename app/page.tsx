import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

const tools = [
  {
    name: "Compress image to a target size",
    description:
      "Shrink JPG, PNG, and WebP files for upload forms, resumes, and websites.",
    href: "/compress-image-to-100kb",
    status: "Available",
  },
  {
    name: "Compress image to 50KB",
    description:
      "Use a tighter preset for stricter upload limits and lightweight attachments.",
    href: "/compress-image-to-50kb",
    status: "Available",
  },
  {
    name: "Resize image dimensions",
    description:
      "Prepare images for platform-specific width and height requirements.",
    href: "#next-tools",
    status: "Coming soon",
  },
  {
    name: "Convert PNG to JPG",
    description:
      "Turn heavy PNG files into lighter JPG exports for faster uploads.",
    href: "#next-tools",
    status: "Coming soon",
  },
  {
    name: "Passport and profile photo crop",
    description:
      "Create upload-friendly images for forms, job applications, and profile photos.",
    href: "#next-tools",
    status: "Coming soon",
  },
  {
    name: "Batch image compressor",
    description:
      "Compress multiple files in one session for creators and operators.",
    href: "#next-tools",
    status: "Planned",
  },
];

export default function Home() {
  return (
    <SiteShell
      eyebrow="Online image tools"
      title="Fast online tools for image compression and upload-ready files"
      intro="SnapKB helps you shrink, prepare, and optimize images for forms, resumes, websites, and everyday uploads. The first tools are focused on fast browser-based compression, with more practical image utilities on the way."
      panelTitle="Why people choose SnapKB"
      panelItems={[
        "No heavy software and no cluttered workflow.",
        "Fast results for common upload size requirements.",
        "Simple tools designed for real tasks, not feature overload.",
      ]}
    >
      <section id="tools" className="grid gap-4 py-2 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <article
            key={tool.name}
            className="rounded-[1.75rem] border border-[color:var(--border)] bg-panel p-5 shadow-float"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                {tool.status}
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{tool.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{tool.description}</p>
            <Link
              href={tool.href}
              className="mt-5 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {tool.status === "Available" ? "Open tool" : "Preview"}
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-6 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Popular uses
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            Built for common image upload tasks
          </h2>
          <div className="mt-5 grid gap-3">
            {[
              "Compress profile photos for forms and job applications.",
              "Reduce image size for blog posts, landing pages, and CMS uploads.",
              "Create smaller files for email attachments and client delivery.",
              "Prepare web-friendly images without installing desktop software.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-white px-4 py-4 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          id="compressor"
          className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-4 shadow-float sm:p-5"
        >
          <ImageCompressor
            title="Compress your image to a target size"
            description="Upload a JPG, PNG, or WebP file and reduce it directly in your browser."
          />
        </div>
      </section>

      <section
        id="next-tools"
        className="grid gap-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
      >
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            More tools
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            More practical image utilities are on the way
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            SnapKB is expanding with a small set of focused tools that solve common image
            preparation tasks for uploads, content publishing, and everyday work.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Resize images by width or height",
              "Convert PNG, JPG, and WebP",
              "Crop image for passport uploads",
              "Batch compress images for bulk work",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-white px-4 py-4 text-sm font-medium text-slate-700"
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
          "Choose a tool based on the task you need to finish.",
          "Upload your image and set the target file size or preset.",
          "Preview the result and download the optimized version.",
          "Use dedicated pages like 50KB and 100KB when you need stricter file size targets.",
        ]}
        faq={[
          {
            question: "Does SnapKB upload my files to a server?",
            answer:
              "The current compression flow is browser-based, which means the file can be processed locally without needing a full server upload workflow for the core task.",
          },
          {
            question: "Can I compress an image to exactly 100KB or 50KB?",
            answer:
              "SnapKB tries to get as close as possible to the target size while keeping the image usable. Some files may end up slightly above or below the target depending on the source image.",
          },
          {
            question: "What other tools will SnapKB add?",
            answer:
              "The next planned additions include image resizing, PNG to JPG conversion, profile photo crop tools, and batch compression for users who handle multiple files at once.",
          },
        ]}
      />
    </SiteShell>
  );
}
