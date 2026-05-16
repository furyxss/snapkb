import type { Metadata } from "next";
import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Compress Image to 100KB Online",
  description:
    "Reduce JPG, PNG, and WebP images to 100KB online with a fast browser-based compressor.",
};

export default function CompressImageTo100KbPage() {
  return (
    <SiteShell
      eyebrow="SEO landing page"
      title="Compress image to 100KB online"
      intro="This page is built for one of the strongest search intents in the image tool market. Users can upload a file, set 100KB as the target, and download a compressed version in one short flow."
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
