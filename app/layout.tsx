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
    default: "SnapKB | 图片生成工具箱",
    template: "%s | SnapKB",
  },
  description:
    "SnapKB 是一个在线图片生成工具箱，可用于生成 ER 图、时序图、流程图、数据流图、架构图、功能结构图和用例图。",
  openGraph: {
    title: "SnapKB | 图片生成工具箱",
    description:
      "使用 SnapKB 在线生成 ER 图、时序图、流程图、数据流图、架构图、功能结构图和用例图。",
    siteName: "SnapKB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapKB | 图片生成工具箱",
    description:
      "一个可在线生成多种结构图和流程图的图片工具箱。",
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
      lang="zh-CN"
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
