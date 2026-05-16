import type { Metadata } from "next";
import { PngToJpgConverter } from "@/components/png-to-jpg-converter";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "PNG to JPG Converter Online",
  description:
    "Convert PNG images to JPG online with SnapKB. Choose JPG quality, fill transparent backgrounds, preview the result, and download locally.",
};

export default function PngToJpgPage() {
  return (
    <SiteShell
      eyebrow="PNG to JPG converter"
      title="Convert PNG images into lighter JPG files."
      intro="Use SnapKB to turn PNG files into JPG exports for forms, websites, marketplaces, and everyday uploads. The conversion runs in your browser."
      primaryCtaHref="/png-to-jpg#converter"
      primaryCtaLabel="Convert a PNG"
      secondaryCtaHref="/#tools"
      secondaryCtaLabel="View all tools"
      panelTitle="Why convert PNG to JPG"
      panelItems={[
        "JPG files are often smaller and easier to upload when transparency is not needed.",
        "You can choose the background color used for transparent pixels.",
        "The tool creates a downloadable JPG without requiring an account.",
      ]}
    >
      <div id="converter" className="py-10">
        <PngToJpgConverter />
      </div>

      <SeoCopy
        heading="How to convert PNG to JPG"
        steps={[
          "Choose a PNG file from your device.",
          "Select a JPG quality preset and background color for transparent pixels.",
          "Preview the converted JPG and compare the output file size.",
          "Download the JPG file and use it for your upload, website, or form.",
        ]}
        faq={[
          {
            question: "What happens to transparent PNG backgrounds?",
            answer:
              "JPG does not support transparency, so SnapKB fills transparent pixels with the background color you choose before exporting.",
          },
          {
            question: "Will JPG always be smaller than PNG?",
            answer:
              "Often yes for photos and complex images, but simple graphics or screenshots can sometimes be smaller as PNG. The result panel shows the size change.",
          },
          {
            question: "Does this upload my PNG to a server?",
            answer:
              "The current converter runs in the browser, so the image conversion can happen locally on your device.",
          },
        ]}
      />
    </SiteShell>
  );
}
