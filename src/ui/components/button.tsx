import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function Button({
  children,
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  const baseClass =
    "flex items-center justify-center text-sm font-medium h-10 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClass, className)}
    >
      {children}
    </button>
  );
}
