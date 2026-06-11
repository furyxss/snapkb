import type { Metadata } from "next";
import { DiagramPage } from "@/components/diagram-page";
import { requireDiagramTool } from "@/lib/require-diagram-tool";

const tool = requireDiagramTool("use-case");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function GenerateUseCaseDiagramPage() {
  return <DiagramPage tool={tool} />;
}
