"use client";

import NavBar from "@ui/components/dashboard/navbar";
import Footer from "@ui/components/dashboard/footer";
import "@/lib/faIcons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <NavBar />

      <main className="flex-grow overflow-y-auto w-full mb-8">
        <div className="content-container">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
