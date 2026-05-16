import type { Metadata } from "next";
import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Compress Image to 50KB Online",
  description:
    "Use SnapKB to compress JPG, PNG, and WebP images to 50KB online for strict upload limits and lightweight sharing.",
};

export default function CompressImageTo50KbPage() {
  return (
    <SiteShell
      eyebrow="SEO landing page"
      title="Compress image to 50KB online"
      intro="The 50KB target is useful for stricter upload forms and low-bandwidth use cases. This is one dedicated page inside SnapKB, which is being built into a broader image and file utility site."
      panelTitle="Why this page matters"
      panelItems={[
        "50KB solves a stricter upload problem than the broader homepage promise.",
        "Dedicated landing pages help the site capture search traffic with cleaner intent matching.",
        "This setup lets the hub expand without weakening the strongest single-tool pages.",
      ]}
    >
      <ImageCompressor
        defaultTargetKb={50}
        title="Reduce images to about 50KB for tight upload limits"
        description="Use the 50KB preset for lightweight attachments, small thumbnails, and forms with stricter size caps."
      />

      <SeoCopy
        heading="When 50KB compression makes sense"
        steps={[
          "Keep the target size at 50KB and upload your image.",
          "Preview the result and check whether the details still work for your use case.",
          "Download the compressed file or retry with 60KB or 80KB if you need a quality boost.",
        ]}
        faq={[
          {
            question: "Is 50KB too small for some photos?",
            answer:
              "For detailed or large images, 50KB can be aggressive. The tool still tries to keep the output useful, but some files may lose visible detail.",
          },
          {
            question: "Why do small target sizes matter?",
            answer:
              "Many upload forms, government portals, job sites, and legacy systems still use strict file size caps.",
          },
          {
            question: "Can this work for documents turned into images?",
            answer:
              "Yes, especially for screenshots or document photos, but very small targets may reduce text clarity. Always preview the output before submitting.",
          },
        ]}
      />
    </SiteShell>
  );
}
