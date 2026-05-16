import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixelpress.app"),
  title: {
    default: "PixelPress | Compress Images to a Target Size",
    template: "%s | PixelPress",
  },
  description:
    "Compress JPG, PNG, and WebP images to 20KB, 50KB, 100KB, or any custom size directly in your browser.",
  openGraph: {
    title: "PixelPress | Compress Images to a Target Size",
    description:
      "Reduce image size online without uploading your files. Fast browser-based compression for JPG, PNG, and WebP.",
    siteName: "PixelPress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelPress | Compress Images to a Target Size",
    description:
      "Fast browser-based image compression for upload forms, resumes, and websites.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
