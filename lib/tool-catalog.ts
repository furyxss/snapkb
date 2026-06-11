export type ToolStatus = "Available" | "Coming soon";

export type ToolItem = {
  name: string;
  description: string;
  href: string;
  status: ToolStatus;
  badge: string;
};

export const toolboxTools: ToolItem[] = [
  {
    name: "Compress Image to 100KB",
    description:
      "Reduce JPG, PNG, and WebP files to around 100KB for forms, websites, and profile uploads.",
    href: "/compress-image-to-100kb",
    status: "Available",
    badge: "100",
  },
  {
    name: "Compress Image to 50KB",
    description:
      "Use a smaller preset for stricter upload limits and lightweight attachments.",
    href: "/compress-image-to-50kb",
    status: "Available",
    badge: "50",
  },
  {
    name: "Custom Size Compressor",
    description:
      "Open the browser-based compressor and choose your own target size in KB.",
    href: "/#tool-preview",
    status: "Available",
    badge: "KB",
  },
  {
    name: "Resize Image Dimensions",
    description:
      "Prepare width and height for platform-specific upload requirements.",
    href: "/tools/resize-image-dimensions",
    status: "Coming soon",
    badge: "RS",
  },
  {
    name: "Convert PNG to JPG",
    description:
      "Turn heavy PNG files into lighter JPG exports for simpler sharing.",
    href: "/tools/convert-png-to-jpg",
    status: "Available",
    badge: "CV",
  },
  {
    name: "Passport Photo Crop",
    description:
      "Create upload-ready passport and profile photos with the right framing.",
    href: "/tools/passport-photo-crop",
    status: "Coming soon",
    badge: "ID",
  },
];

export const comingSoonTools = toolboxTools.filter(
  (tool) => tool.status === "Coming soon",
);
