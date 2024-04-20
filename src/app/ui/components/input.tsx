import clsx from "clsx";

interface InputProps {
  id: string;
  name: string;
  type: "text";
  placeholder: string;
  required?: boolean;
  label: string;
  className?: string;
}

const TextInput: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  required = true,
  label,
  className,
}) => {
  const inputClass = clsx(
    "w-full p-2 bg-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray]",
    className
  );

  return (
    <label className="relative mb-6 flex items-center w-full">
      <span className="sr-only">{label}</span>
      <div className="relative w-full">
        <input
          id={id}
          name={name}
          type={type}
          className={inputClass}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </label>
  );
};

export default TextInput;
