import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_SC({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = Noto_Sans_SC({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.doooit.me"),
  title: "曲风分支 · Genre Tree",
  description:
    "Browse style variants of a public-domain melody. Display-only: static tree, cards, and audio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
