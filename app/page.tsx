import { AdsenseAd } from "@/components/adsense-ad";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

const tools = [
  {
    name: "Compress to 100KB",
    description: "适合表单、简历、头像和 CMS 上传的常用压缩目标。",
    href: "/compress-image-to-100kb",
    status: "Live",
    metric: "100 KB",
  },
  {
    name: "Compress to 50KB",
    description: "适合老系统、小附件、严格上传限制的更小体积版本。",
    href: "/compress-image-to-50kb",
    status: "Live",
    metric: "50 KB",
  },
  {
    name: "PNG to JPG",
    description: "把 PNG 转成更轻量的 JPG，适合网站、表单和常规图片上传。",
    href: "/png-to-jpg",
    status: "Live",
    metric: "Convert",
  },
  {
    name: "DOCX to PDF",
    description: "把 Word 文档转成 PDF，方便投递、发送和归档。",
    href: "/docx-to-pdf",
    status: "Live",
    metric: "PDF",
  },
  {
    name: "Clean Image Marks",
    description: "处理图片里的文字、遮挡和痕迹，用于展示图清理和二次整理。",
    href: "/clean-image-marks",
    status: "Live",
    metric: "Clean",
  },
  {
    name: "Generate ER Diagram",
    description: "生成数据库实体关系图，适合表结构设计和业务建模。",
    href: "/generate-er-diagram",
    status: "Live",
    metric: "ER",
  },
  {
    name: "Generate Sequence Diagram",
    description: "生成时序图，梳理角色、接口和服务之间的调用顺序。",
    href: "/generate-sequence-diagram",
    status: "Live",
    metric: "SEQ",
  },
  {
    name: "Generate Flowchart",
    description: "生成流程图，适合业务步骤、审批链路和操作流程说明。",
    href: "/generate-flowchart",
    status: "Live",
    metric: "Flow",
  },
  {
    name: "Generate Data Flow Diagram",
    description: "生成数据流图，用来表达数据输入、处理、存储和输出。",
    href: "/generate-data-flow-diagram",
    status: "Live",
    metric: "DFD",
  },
  {
    name: "Generate Architecture Diagram",
    description: "生成架构图，梳理系统模块、服务和基础设施关系。",
    href: "/generate-architecture-diagram",
    status: "Live",
    metric: "Arch",
  },
  {
    name: "Functional Structure Diagram",
    description: "生成功能结构图，适合产品模块拆解和后台能力梳理。",
    href: "/generate-functional-structure-diagram",
    status: "Live",
    metric: "Func",
  },
  {
    name: "Generate Use Case Diagram",
    description: "生成用例图，适合需求分析、角色说明和系统边界表达。",
    href: "/generate-use-case-diagram",
    status: "Live",
    metric: "Use",
  },
];

export default function Home() {
  return (
    <SiteShell
      eyebrow="SnapKB toolbox"
      title="Keep SnapKB's style, but put every useful tool in one place."
      intro="首页不再拆成不同风格的落地页，而是继续沿用 SnapKB 原本的视觉语言，把压缩、转换、清理和图表生成能力统一放进同一个工具箱入口。"
      primaryCtaHref="/#tools"
      primaryCtaLabel="Browse all tools"
      secondaryCtaHref="/compress-image-to-100kb"
      secondaryCtaLabel="Open 100KB tool"
      panelTitle="What this homepage does now"
      panelItems={[
        "保留 SnapKB 现有品牌风格和页面骨架。",
        "把原有功能和新图表工具统一到一个工具箱里。",
        "每个工具继续走自己的独立功能页，不互相打断。",
      ]}
    >
      <section id="tools" className="py-10">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Unified toolbox
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">
              One tool grid for the whole site
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            这里统一展示图片压缩、格式转换、文档转换、图片清理，以及 ER 图、时序图、流程图、架构图等全部工具。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
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
              <span className="mt-7 inline-flex w-fit rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition group-hover:bg-accent">
                Open tool
              </span>
            </a>
          ))}
        </div>
      </section>

      <AdsenseAd
        slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT}
        className="py-4"
        format="auto"
      />

      <SeoCopy
        heading="How to use the toolbox"
        steps={[
          "从首页工具箱里直接找到你要的工具。",
          "点击进入对应页面后，按该工具的流程上传、编辑或生成内容。",
          "图表类工具支持代码编辑、实时预览、复制和下载 SVG。",
          "压缩、转换和清理类工具继续保持原来的独立能力。",
        ]}
        faq={[
          {
            question: "原来的压缩和转换工具还在吗？",
            answer:
              "在。100KB、50KB、PNG 转 JPG、DOCX 转 PDF、图片去痕迹这些工具都还保留，只是现在和新图表工具一起放进同一个工具箱入口。",
          },
          {
            question: "为什么首页样式又变回来了？",
            answer:
              "首页现在重新使用 SnapKB 现有的视觉风格，只保留统一工具入口这件事，不再照搬外部参考图的布局。",
          },
          {
            question: "图表工具和原有工具是同一套站点吗？",
            answer:
              "是。同一个站点、同一个工具箱入口，只是每个功能继续用自己的独立页面完成实际操作。",
          },
        ]}
      />
    </SiteShell>
  );
}
