import { NavBar } from "@/ui/components/dashboard/navbar";
import { Footer } from "@/ui/components/dashboard/footer";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <NavBar />

      <main className="flex-grow overflow-y-auto w-full mb-8">
        <div className="content-container">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
