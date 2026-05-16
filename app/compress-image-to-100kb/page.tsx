import type { Metadata } from "next";
import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Compress Image to 100KB Online",
  description:
    "Use SnapKB to reduce JPG, PNG, and WebP images to 100KB online with a fast browser-based compressor.",
};

export default function CompressImageTo100KbPage() {
  return (
    <SiteShell
      eyebrow="SEO landing page"
      title="Compress image to 100KB online"
      intro="This page is one working tool inside SnapKB, a focused hub for image and upload-friendly file utilities. Users can upload a file, set 100KB as the target, and download a compressed version in one short flow."
      panelTitle="Why this page matters"
      panelItems={[
        "100KB is one of the clearest search intents in this category.",
        "The user journey is short, practical, and easy to test on mobile.",
        "This page can rank on its own while feeding traffic into the broader tool hub.",
      ]}
    >
      <ImageCompressor
        defaultTargetKb={100}
        title="Reduce JPG, PNG, or WebP images to around 100KB"
        description="Use this page for form uploads, portfolio images, and profile pictures that need a smaller file size."
      />

      <SeoCopy
        heading="Why people look for 100KB compression"
        steps={[
          "Upload your image and keep the target set to 100KB.",
          "Let the browser compress the file without installing software.",
          "Download the result and retry with a smaller or larger target if needed.",
        ]}
        faq={[
          {
            question: "What is 100KB usually good for?",
            answer:
              "A 100KB target is common for profile photos, forms, resumes, and lightweight web uploads where a file limit exists.",
          },
          {
            question: "Will the image quality still look okay?",
            answer:
              "Most standard photos will still look usable at 100KB, especially after the tool balances export quality and size.",
          },
          {
            question: "Can I use this on mobile?",
            answer:
              "Yes. The page is responsive and the compression happens in the browser, so it works on both phones and desktop devices.",
          },
        ]}
      />
    </SiteShell>
  );
}
