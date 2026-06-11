import type { Metadata } from "next";
import { PngToJpgConverter } from "@/components/png-to-jpg-converter";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Convert PNG to JPG",
  description:
    "Convert PNG to JPG online with a browser-based SnapKB tool for lighter exports and upload-friendly image files.",
};

export default function ConvertPngToJpgPage() {
  return (
    <SiteShell
      eyebrow="Tool page"
      title="Convert PNG to JPG"
      intro="Turn PNG images into JPG files directly in your browser. This is useful when you want lighter uploads, simpler attachments, or wider JPG compatibility."
      panelTitle="Why people use this tool"
      panelItems={[
        "Convert large PNG files into lighter JPG exports.",
        "Flatten transparent backgrounds into a clean white JPG.",
        "Prepare upload-friendly image files without extra software.",
      ]}
    >
      <PngToJpgConverter />
    </SiteShell>
  );
}
