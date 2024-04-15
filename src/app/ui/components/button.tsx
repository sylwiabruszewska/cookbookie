import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, className, onClick, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={clsx(
        "flex h-10 items-center justify-center rounded-lg bg-[--primary-color] px-6 text-sm font-medium text-white transition-colors hover:bg-transparent border-2 border-[--primary-color] hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--primary-color] active:bg-[--primary-color] aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
