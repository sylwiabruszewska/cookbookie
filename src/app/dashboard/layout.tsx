import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/ui/components/newsletter-form";
import NavBar from "@ui/components/navbar";
import { signOut } from "@auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <>
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

        <footer className="w-full">
          <div className="bg-[--gray-dark] text-white py-12">
            <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
              <div className="flex flex-col items-center space-y-8">
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Image
                      src="/logo-dark.svg"
                      alt="CookBookie Logo"
                      className="dark:invert"
                      width={44}
                      height={44}
                      priority
                    />
                  </Link>
                  <h3 className="text-xl tracking-wider">CookBookie</h3>
                </div>
                <div>
                  <ul className="flex flex-col items-center space-y-2">
                    <li>
                      <Link href="/dashboard/add-recipe">Add recipes</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/my-recipes">My recipes</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/favorites">Favorites</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/shopping-list">Shopping list</Link>
                    </li>
                  </ul>
                </div>
                <NewsletterForm />
              </div>
            </div>
          </div>
          <div className="py-4 text-[--gray-dark]">
            <div className="container mx-auto w-[343px] md:w-[704px] lg:w-[1240px]">
              <div className="flex justify-center space-x-4 text-xs">
                <span>© 2023 All Rights Reserved.</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
}
