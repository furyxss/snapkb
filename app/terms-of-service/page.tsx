import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the PixelPress browser-based image compression tool.",
};

export default function TermsOfServicePage() {
  return (
    <SiteShell
      eyebrow="Legal"
      title="Terms of Service"
      intro="These lightweight terms are suitable for an MVP and should be reviewed before a public launch."
    >
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
        <div className="space-y-5 text-sm leading-7 text-slate-700">
          <p>
            PixelPress is provided on an as-is basis for image compression and file size reduction.
            The service may change, pause, or be removed at any time while the product is in MVP
            stage.
          </p>
          <p>
            Users are responsible for checking whether the compressed image still meets their
            submission, quality, and legal requirements before using it for official or commercial
            purposes.
          </p>
          <p>
            You should replace this draft with a jurisdiction-specific legal review before launching
            paid plans, team accounts, API usage, or enterprise features.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
