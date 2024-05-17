"use client";

import NavBar from "@ui/components/navbar";
import Footer from "@ui/components/dashboard/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <NavBar />

      <main className="flex-grow overflow-y-auto w-full mb-8">
        <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
