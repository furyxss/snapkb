import { DiagramTool, getDiagramTool } from "@/lib/diagram-tools";

export function requireDiagramTool(slug: string): DiagramTool {
  const tool = getDiagramTool(slug);
  if (!tool) {
    throw new Error(`Missing diagram tool config: ${slug}`);
  }

  return tool;
}
