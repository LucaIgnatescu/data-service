import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Data Service",
  description: "A Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${courier.className} bg-black text-neutral-400`}>
        {children}
      </body>
    </html>
  );
}
