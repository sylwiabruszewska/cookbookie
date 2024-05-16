import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "green" | "dark" | "border" | "icon";
  className?: string;
}

export function Button({
  children,
  type = "button",
  onClick,
  variant = "green",
  className,
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === "button") {
      e.preventDefault();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        "flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          "bg-[--primary-color] text-white hover:bg-[--gray-dark] hover:text-white px-2 h-10":
            variant === "green",
          "bg-[--gray-dark] text-white border-[--primary-color] hover:bg-[--primary-color] hover:border-white px-2 h-10 ":
            variant === "dark",
          "bg-[--primary-color] text-white border-2 border-[--primary-color] hover:bg-transparent hover:border-white px-2 h-10 ":
            variant === "border",
          "bg-transparent text-[--gray-medium] hover:text-[black] h-10 w-10":
            variant === "icon",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
