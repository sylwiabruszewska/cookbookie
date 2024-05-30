import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import "@/ui/styles/globals.css";
import Provider from "@ui/components/provider";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#22252a",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
