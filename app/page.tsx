import { ImageCompressor } from "@/components/image-compressor";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell
      eyebrow="File tool MVP"
      title="Compress images to a target size without uploading them"
      intro="PixelPress helps people reduce JPG, PNG, and WebP files for upload limits, forms, resumes, and websites. The first version runs directly in the browser, which keeps costs low and makes privacy easier to explain."
    >
      <ImageCompressor />

      <SeoCopy
        heading="How to compress an image online"
        steps={[
          "Enter the target size you need, such as 50KB, 100KB, or 200KB.",
          "Choose one JPG, PNG, or WebP file from your device.",
          "Wait a moment while the browser reduces image quality and export size.",
          "Preview the output, compare the file size, and download the compressed image.",
        ]}
        faq={[
          {
            question: "Does this upload my image to a server?",
            answer:
              "No. This MVP processes images in the browser so your files do not need to be sent to a backend for the core compression flow.",
          },
          {
            question: "Why is PNG sometimes converted to JPG?",
            answer:
              "PNG files can stay large even after compression. Converting some PNG uploads to JPG helps the tool hit smaller target sizes more reliably.",
          },
          {
            question: "Can I compress an image to exactly 100KB?",
            answer:
              "The tool tries to get as close as possible to the target while keeping the image useful. Very detailed images may end up slightly above or below the target.",
          },
        ]}
      />
    </SiteShell>
  );
}
