import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className="fixed inset-0 w-[100vw] h-[100vh] flex items-center justify-center bg-[#EBF3D4] z-50">
      <div className="absolute top-4 left-6">
        <Link href="/dashboard" className="flex items-center space-x-4">
          <Image
            src="/logo.svg"
            alt="CookBookie Logo"
            className="dark:invert"
            width={44}
            height={44}
            priority
          />
          <p className="max-sm:hidden font-semibold text-lg text-black tracking-wide">
            CookBookie
          </p>
        </Link>
      </div>
      <div className="absolute top-6 right-6">
        <span onClick={closeMenu}>
          <FontAwesomeIcon
            icon={faXmark}
            aria-label="Close"
            className="w-[28px] h-[28px]"
          />
        </span>
      </div>

      <ul className="flex flex-col items-center justify-center text-[18px] space-y-4 font-semibold">
        <li onClick={handleLinkClick}>
          <Link href="/dashboard/add-recipe">Add recipes</Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link href="/dashboard/my-recipes">My recipes</Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link href="/dashboard/favorites">Favorites</Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link href="/dashboard/shopping-list">Shopping list</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
