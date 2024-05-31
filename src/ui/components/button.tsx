import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "green" | "crazyRounded" | "dark" | "border" | "icon";
  className?: string;
}

export function Button({
  children,
  type = "button",
  onClick,
  variant = "green",
  className,
}: ButtonProps) {
  const variantClasses = clsx({
    "bg-[--primary-color] text-white hover:bg-[--gray-dark] hover:text-white px-2 h-10":
      variant === "green",
    "bg-[--primary-color] text-white hover:bg-[--gray-dark] hover:text-white px-5 rounded-tl-[15px] rounded-bl-[40px] rounded-br-[15px] rounded-tr-[40px] h-10":
      variant === "crazyRounded",
    "bg-[--gray-dark] text-white border-[--primary-color] hover:bg-[--primary-color] hover:border-white px-2 h-10":
      variant === "dark",
    "bg-[--primary-color] text-white border-2 border-[--primary-color] hover:bg-transparent hover:border-white px-2 h-10":
      variant === "border",
    "bg-transparent text-[--gray-medium] hover:text-[black] h-10 w-10":
      variant === "icon",
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        className,
        "flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses,
        className
      )}
    >
      {children}
    </button>
  );
}
