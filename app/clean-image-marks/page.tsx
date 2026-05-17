import type { Metadata } from "next";
import { ImageMarkCleaner } from "@/components/image-mark-cleaner";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Clean Image Marks Online",
  description:
    "Cover text, logos, and private marks on images you own. Use SnapKB's browser-based image mark cleaner to blur or cover selected areas.",
};

export default function CleanImageMarksPage() {
  return (
    <SiteShell
      eyebrow="Image mark cleaner"
      title="Clean marks, text, and private details from images you own."
      intro="Use SnapKB to blur or cover selected areas on screenshots, product photos, and personal images directly in your browser."
      primaryCtaHref="/clean-image-marks#cleaner"
      primaryCtaLabel="Clean an image"
      secondaryCtaHref="/#tools"
      secondaryCtaLabel="View all tools"
      panelTitle="Responsible image cleanup"
      panelItems={[
        "Designed for images you own or have permission to edit.",
        "Useful for privacy redaction, old labels, draft notes, and accidental marks.",
        "The editing flow runs in your browser and exports a PNG.",
      ]}
    >
      <div id="cleaner" className="py-10">
        <ImageMarkCleaner />
      </div>

      <SeoCopy
        heading="How to clean marks from an image"
        steps={[
          "Upload a JPG, PNG, or WebP image you own.",
          "Choose blur mode or cover mode and adjust the brush size.",
          "Paint over the text, logo, or private area you want to clean.",
          "Prepare the export and download the cleaned PNG file.",
        ]}
        faq={[
          {
            question: "Is this an AI watermark remover?",
            answer:
              "No. This tool does not reconstruct hidden image content. It helps blur or cover selected areas for legitimate cleanup and privacy redaction.",
          },
          {
            question: "Can I use this on copyrighted images?",
            answer:
              "Only edit images you own or have permission to modify. Do not use it to remove ownership marks from someone else's work.",
          },
          {
            question: "Does SnapKB upload the image?",
            answer:
              "The mark cleaner runs in the browser, so the core editing flow happens locally on your device.",
          },
        ]}
      />
    </SiteShell>
  );
}
