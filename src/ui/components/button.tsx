import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "green" | "crazyRounded" | "dark" | "border" | "icon" | "logout";
  className?: string;
}

export function Button({
  children,
  type = "button",
  onClick,
  variant = "green",
  className,
}: ButtonProps) {
  const baseClass =
    "flex items-center justify-center text-sm font-medium h-10 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const variantClasses = clsx({
    "bg-[--primary-color] text-white hover:bg-[--gray-dark] hover:text-white rounded-lg px-2":
      variant === "green",
    "bg-[--primary-color] text-white hover:bg-[--gray-dark] hover:text-white btn-rounded px-5":
      variant === "crazyRounded",
    "bg-[--gray-dark] text-white hover:bg-[--primary-color] rounded-lg px-2 h-10":
      variant === "dark",
    "bg-[--primary-color] text-white border-2 border-[--primary-color] hover:bg-transparent hover:border-white rounded-lg px-2":
      variant === "border",
    "bg-transparent text-[--gray-medium] hover:text-[black] w-10":
      variant === "icon",
    "bg-[--gray-dark] text-white border-2 border-white btn-rounded px-3":
      variant === "logout",
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClass, variantClasses, className)}
    >
      {children}
    </button>
  );
}
