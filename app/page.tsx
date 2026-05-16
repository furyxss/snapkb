import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";
import Link from "next/link";

const tools = [
  {
    name: "Compress image to any target size",
    description:
      "Upload a JPG, PNG, or WebP file and shrink it for forms, resumes, and websites.",
    href: "/compress-image-to-100kb",
    status: "Live now",
  },
  {
    name: "Compress image to 50KB",
    description:
      "A tighter landing page for stricter upload limits and smaller attachments.",
    href: "/compress-image-to-50kb",
    status: "Live now",
  },
  {
    name: "Resize image dimensions",
    description:
      "Prepare images for platform-specific width and height requirements.",
    href: "#next-tools",
    status: "Coming next",
  },
  {
    name: "Convert PNG to JPG",
    description:
      "Turn heavy PNG files into lighter JPG exports for fast uploads.",
    href: "#next-tools",
    status: "Coming next",
  },
  {
    name: "Passport and profile photo crop",
    description:
      "Create upload-friendly images for forms, job applications, and IDs.",
    href: "#next-tools",
    status: "Coming next",
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
      eyebrow="Multi-tool hub"
      title="Simple online tools for image and file tasks"
      intro="SnapKB is no longer just one landing page. It is becoming a focused toolbox for image compression, conversion, resizing, and upload-friendly file tasks. The current live tools already work in the browser, and the next ones can be added one by one without rebuilding the whole site."
      panelTitle="Why a tool hub is stronger"
      panelItems={[
        "A broader toolbox feels more like a real product than a single isolated page.",
        "Users can discover one tool and stay for related tasks instead of bouncing away.",
        "The site can grow tool by tool while keeping each page aligned with a clear search intent.",
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
              {tool.status === "Live now" ? "Open tool" : "See roadmap"}
            </Link>
          </article>
        ))}
      </section>

      <ImageCompressor />

      <section
        id="next-tools"
        className="grid gap-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
      >
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            What comes next
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            Build one useful tool at a time
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            The best version of this site is not a random pile of utilities. It should stay tight
            around image and upload tasks so the brand, SEO structure, and user intent keep
            reinforcing each other.
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
        heading="How SnapKB should grow"
        steps={[
          "Keep the tool scope centered on image and upload jobs, not every file type on the web.",
          "Launch one page per useful job, such as compressing to 100KB or resizing for a form.",
          "Use each working tool as both a product feature and an SEO landing page.",
          "Add paid layers later through batch tools, no-ads plans, or faster workflows.",
        ]}
        faq={[
          {
            question: "Why not keep it as a single landing page?",
            answer:
              "A single landing page can validate one keyword, but a small hub gives you more room to build brand memory, cross-link related tools, and keep users on the site longer.",
          },
          {
            question: "Should this become a giant all-in-one file site?",
            answer:
              "Not yet. A tighter image-first toolbox is easier to explain, easier to rank, and less likely to feel like a thin copy of every other utility site.",
          },
          {
            question: "What should be the next real feature?",
            answer:
              "The next strongest additions are image resizing, PNG to JPG conversion, and a simple crop tool for passport or profile uploads because they match the current audience and sharing flow.",
          },
        ]}
      />
    </SiteShell>
  );
}
