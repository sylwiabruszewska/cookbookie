import clsx from "clsx";

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  label: string;
  className?: string;
}

const baseClass =
  "w-full p-2 bg-[#efefef] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray-dark]";

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  required = true,
  label,
  className,
}) => {
  return (
    <label className="relative mb-6 flex items-center w-full">
      <span className="sr-only">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={clsx(baseClass, className)}
      />
    </label>
  );
};
