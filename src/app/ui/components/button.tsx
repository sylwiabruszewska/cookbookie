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
        "flex h-10 items-center justify-center rounded-lg bg-orange-500 px-6 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:bg-orange-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}