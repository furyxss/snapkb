import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the PixelPress browser-based image compression tool.",
};

export default function PrivacyPolicyPage() {
  return (
    <SiteShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This first MVP keeps privacy simple by running the core compression flow inside the user's browser."
    >
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-panel p-6 shadow-float">
        <div className="space-y-5 text-sm leading-7 text-slate-700">
          <p>
            PixelPress is designed to minimize file handling on the server side. In the current MVP,
            image compression runs in the browser, which means selected files do not need to be
            uploaded to a backend for the primary compression workflow.
          </p>
          <p>
            Basic analytics may be added later to understand page traffic, feature usage, and
            conversion opportunities. If analytics are added, the policy should be updated with the
            exact provider and data categories used.
          </p>
          <p>
            Users should avoid uploading sensitive files until the product has a fully reviewed
            production privacy policy, security audit, and support workflow.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
