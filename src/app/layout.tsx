import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import "./ui/styles/globals.css";

export const metadata: Metadata = {
  title: "CookBookie",
  description: "Your own digital cookbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
