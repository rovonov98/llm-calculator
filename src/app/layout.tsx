import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LLM pricing calculator",
  description: `Calculate and compare the cost of using OpenAI Chatgpt, Anthropic Claude, Meta Llama 3, Google Gemini, and Mistral LLM APIs with this simple and powerful free calculator. Latest numbers as of June 2024.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " " + "w-full"}>{children}</body>
      <GoogleAnalytics gaId="G-92ZX09WRNW" />
    </html>
  );
}
