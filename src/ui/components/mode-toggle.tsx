import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleToggle = () => {
    const newTheme =
      theme === "dark" || (theme === "system" && systemTheme === "dark")
        ? "light"
        : "dark";
    setTheme(newTheme);
  };

  const isDarkMode =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <div className="flex items-center">
      <label className="cursor-pointer inline-flex items-center space-x-4 w-auto">
        <button
          type="button"
          onClick={handleToggle}
          className={`relative w-12 h-6 duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[--foreground] inner-shadow ${
            isDarkMode ? "bg-[--gray-medium]" : "bg-[--gray-light]"
          }`}
        >
          <div className="absolute left-1 top-1">
            <FontAwesomeIcon
              icon="moon"
              className={`w-4 h-4 text-[--font] ${
                isDarkMode ? "block" : "hidden"
              }`}
            />
          </div>
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[--background] rounded-full shadow transition-transform duration-300 ease-in-out ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
          <div className="absolute right-1 top-1">
            <FontAwesomeIcon
              icon="sun"
              className={`w-4 h-4 text-yellow-400 ${
                isDarkMode ? "hidden" : "block"
              }`}
            />
          </div>
        </button>
      </label>
    </div>
  );
}
