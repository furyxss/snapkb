import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { ToolComingSoon } from "@/components/tool-coming-soon";

export const metadata: Metadata = {
  title: "Passport Photo Crop",
  description:
    "SnapKB is preparing a passport photo crop tool for profile photos, forms, and ID-style image requirements.",
};

export default function PassportPhotoCropPage() {
  return (
    <SiteShell
      eyebrow="Tool page"
      title="Passport photo crop"
      intro="The toolbox can now route users into a dedicated passport photo crop page. The actual crop editor can be added here next."
      panelTitle="Planned use cases"
      panelItems={[
        "Create framed passport-style images for online forms.",
        "Prepare profile photos for job applications and portals.",
        "Standardize headshot crops before compression.",
      ]}
    >
      <ToolComingSoon
        category="Coming soon"
        title="Passport and ID photo crop tool"
        description="This page is reserved for a focused crop workflow that helps users create upload-ready passport and profile images."
      />
    </SiteShell>
  );
}
