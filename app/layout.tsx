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
  metadataBase: new URL("https://snapkb.com"),
  title: {
    default: "SnapKB | Online Image and File Tools",
    template: "%s | SnapKB",
  },
  description:
    "SnapKB is a lightweight online tool hub for image and file tasks like compressing images to 50KB, 100KB, and other upload-friendly sizes.",
  openGraph: {
    title: "SnapKB | Online Image and File Tools",
    description:
      "Use SnapKB for lightweight browser-based image and file utilities built for uploads, forms, creators, and quick tasks.",
    siteName: "SnapKB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapKB | Online Image and File Tools",
    description:
      "A small, practical online toolbox for image compression and other upload-friendly file utilities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
      {adsenseClient ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      ) : null}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
