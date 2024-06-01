import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import "@/ui/styles/globals.css";
import Provider from "@ui/components/provider";
import { Toaster } from "react-hot-toast";
import { toasterConfig } from "@config/toaster";

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
        <Toaster {...toasterConfig} />
      </body>
    </html>
  );
}
