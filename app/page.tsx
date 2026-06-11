import Link from "next/link";
import { diagramTools } from "@/lib/diagram-tools";

const homepageTools = [
  { slug: "er", href: "/generate-er-diagram" },
  { slug: "sequence", href: "/generate-sequence-diagram" },
  { slug: "flowchart", href: "/generate-flowchart" },
  { slug: "data-flow", href: "/generate-data-flow-diagram" },
  { slug: "architecture", href: "/generate-architecture-diagram" },
  {
    slug: "functional-structure",
    href: "/generate-functional-structure-diagram",
  },
  { slug: "use-case", href: "/generate-use-case-diagram" },
];

const tools = homepageTools.map((item) => {
  const tool = diagramTools.find((entry) => entry.slug === item.slug);
  if (!tool) {
    throw new Error(`Missing homepage tool config: ${item.slug}`);
  }

  return {
    ...tool,
    href: item.href,
  };
});

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white px-6 py-8 shadow-[0_22px_70px_rgba(84,67,132,0.12)] sm:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-2 rounded-full bg-[linear-gradient(180deg,#60a5fa_0%,#2563eb_100%)]" />
          <h1 className="text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
            图片生成
          </h1>
        </div>

        <div className="mt-12 grid gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group flex flex-col items-center text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(180deg,#9d6bff_0%,#7c3aed_100%)] text-3xl font-black text-white shadow-[0_16px_36px_rgba(168,85,247,0.25)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_rgba(168,85,247,0.32)]">
                {tool.badge}
              </div>
              <h2 className="mt-6 text-[2rem] font-medium leading-none text-[#111827]">
                {tool.title}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
