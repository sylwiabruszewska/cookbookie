import NavBar from "@ui/components/navbar";
import { signOut } from "@auth";
import Footer from "@ui/components/dashboard/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="h-[48px] rounded-md bg-gray-50 p-3 ">
          Sign Out
        </button>
      </form>

      <NavBar />

      <main className="flex-grow overflow-y-auto w-full">
        <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
