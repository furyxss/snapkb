import type { Metadata } from "next";
import { DocxToPdfConverter } from "@/components/docx-to-pdf-converter";
import { SeoCopy } from "@/components/seo-copy";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "DOCX to PDF Converter Online",
  description:
    "Convert DOCX Word documents to PDF online with SnapKB. Preview the document in your browser and download a PDF file.",
};

export default function DocxToPdfPage() {
  return (
    <SiteShell
      eyebrow="DOCX to PDF converter"
      title="Convert DOCX files into PDF without a heavy desktop workflow."
      intro="Upload a Word .docx document, preview the readable layout, and export a PDF directly from your browser. Best for resumes, notes, letters, and simple reports."
      primaryCtaHref="/docx-to-pdf#converter"
      primaryCtaLabel="Convert DOCX"
      secondaryCtaHref="/#tools"
      secondaryCtaLabel="View all tools"
      panelTitle="Good fit for"
      panelItems={[
        "Text-focused resumes, letters, notes, and simple reports.",
        "Quick PDF exports when installing office software is overkill.",
        "Private browser-side conversion for everyday documents.",
      ]}
    >
      <div id="converter" className="py-10">
        <DocxToPdfConverter />
      </div>

      <SeoCopy
        heading="How to convert DOCX to PDF"
        steps={[
          "Choose a .docx file from your device.",
          "Review the browser-rendered document preview.",
          "Click Download PDF to export the preview as an A4 PDF file.",
          "Open the PDF and confirm the layout before sharing or submitting it.",
        ]}
        faq={[
          {
            question: "Will the PDF look exactly like Microsoft Word?",
            answer:
              "This browser converter is best for text-focused documents. Complex Word layouts, custom fonts, headers, footers, and advanced elements may be simplified.",
          },
          {
            question: "Does the DOCX upload to a server?",
            answer:
              "The current workflow parses and exports in the browser, so it is designed to avoid a server upload for the core conversion task.",
          },
          {
            question: "What should I use for exact legal or business documents?",
            answer:
              "For exact Word fidelity, use a server-side LibreOffice or Microsoft Word conversion flow, then compare the exported PDF carefully.",
          },
        ]}
      />
    </SiteShell>
  );
}
