import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import "@/ui/styles/globals.css";
import Provider from "@ui/components/provider";

export const metadata: Metadata = {
  title: "CookBookie",
  description: "Your own digital cookbook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
