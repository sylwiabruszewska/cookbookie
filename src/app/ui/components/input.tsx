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

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  options: SelectOption[];
  label: string;
  className?: string;
}

interface TextAreaProps {
  id: string;
  placeholder: string;
  className?: string;
}

const baseClass =
  "w-full h-10 p-2 bg-[#efefef] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray-dark]";

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
    <label className="mb-4 flex items-center w-full">
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

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  label,
  className,
}) => {
  return (
    <label className="mb-4 flex items-center w-full">
      <span className="sr-only">{label}</span>
      <select
        id={id}
        name={name}
        className={clsx(baseClass, className)}
        defaultValue=""
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  className,
}) => {
  return (
    <textarea
      id={id}
      className={clsx(baseClass, className)}
      placeholder={placeholder}
    ></textarea>
  );
};
