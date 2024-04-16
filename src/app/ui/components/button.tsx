import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  className,
  onClick,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={clsx(
        "flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-[--primary-color] aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        {
          "bg-[--primary-color] text-white border-2 border-[--primary-color] hover:bg-transparent hover:border-white":
            variant === "primary",
          "bg-[--primary-color] text-white hover:bg-[--gray-dark] hover:text-white":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
