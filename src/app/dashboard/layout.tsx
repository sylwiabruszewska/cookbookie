import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <>
        <header className=" text-gray-800 py-4 w-full">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="CookBookie Logo"
                className="dark:invert"
                width={44}
                height={44}
                priority
              />
            </Link>

            <nav className="flex flex-grow justify-center">
              <ul className="flex space-x-10">
                <li>
                  <Link href="/add-recipe">Add recipes</Link>
                </li>
                <li>
                  <Link href="/my-recipes">My recipes</Link>
                </li>
                <li>
                  <Link href="/favorites">Favorites</Link>
                </li>
                <li>
                  <Link href="/shopping-list">Shopping list</Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center">
              <div className="ml-4">Search</div>
              <div className="ml-20">User</div>
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto w-full">
          <div className="container mx-auto">{children}</div>
        </main>

        <footer className="bg-gray-700 text-white py-4 w-full">
          <div className="container mx-auto">
            <p className="text-xl">Footer</p>
          </div>
        </footer>
      </>
    </div>
  );
}
