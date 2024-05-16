import Link from "next/link";

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className="fixed inset-0 w-[100vw] h-[100vh] flex items-center justify-center bg-[var(--primary-color)] z-50">
      <div className="absolute top-4 right-4">
        <span onClick={closeMenu}>X</span>
      </div>

      <ul className="flex flex-col items-center justify-center">
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
