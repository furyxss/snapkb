import { DiagramPlayground } from "@/components/diagram-playground";
import { SiteShell } from "@/components/site-shell";
import type { DiagramTool } from "@/lib/diagram-tools";

export function DiagramPage({ tool }: { tool: DiagramTool }) {
  return (
    <SiteShell
      eyebrow="图片生成工具"
      title={tool.title}
      intro={tool.intro}
      primaryCtaHref={`/#tool-${tool.slug}`}
      primaryCtaLabel="返回工具箱"
      secondaryCtaHref="/"
      secondaryCtaLabel="查看全部工具"
      panelTitle="适合场景"
      panelItems={tool.tips}
    >
      <div id={`tool-${tool.slug}`}>
        <DiagramPlayground
          title={tool.title}
          description={tool.description}
          template={tool.template}
          tips={tool.tips}
        />
      </div>
    </SiteShell>
  );
}
