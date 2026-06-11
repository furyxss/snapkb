import type { Metadata } from "next";
import { DiagramPage } from "@/components/diagram-page";
import { requireDiagramTool } from "@/lib/require-diagram-tool";

const tool = requireDiagramTool("data-flow");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
};

export default function GenerateDataFlowDiagramPage() {
  return <DiagramPage tool={tool} />;
}
