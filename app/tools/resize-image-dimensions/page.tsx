import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { ToolComingSoon } from "@/components/tool-coming-soon";

export const metadata: Metadata = {
  title: "Resize Image Dimensions",
  description:
    "SnapKB is preparing an image dimension resize tool for width and height based upload requirements.",
};

export default function ResizeImageDimensionsPage() {
  return (
    <SiteShell
      eyebrow="Tool page"
      title="Resize image dimensions"
      intro="A dedicated resize tool page is now part of the toolbox structure. The function can be added here next without changing the homepage flow."
      panelTitle="Planned use cases"
      panelItems={[
        "Prepare width and height for website or marketplace uploads.",
        "Match social media and profile image dimension rules.",
        "Quickly create lighter images before compression.",
      ]}
    >
      <ToolComingSoon
        category="Coming soon"
        title="Dimension-based resize tool"
        description="This page is reserved for a resize workflow where users can set width or height and export a platform-ready image."
      />
    </SiteShell>
  );
}
