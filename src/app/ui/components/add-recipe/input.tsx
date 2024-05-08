import clsx from "clsx";
import { useField } from "formik";

const baseClass = "recipe-form-components";

interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  label: string;
  className?: string;
  readOnly?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  label,
  className,
  readOnly,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.value);
  };

  return (
    <label className="relative mb-4 flex items-center w-full">
      <span className="sr-only">{label}</span>
      <input
        id={id}
        {...field}
        type={type}
        placeholder={placeholder}
        className={clsx(baseClass, className)}
        readOnly={readOnly}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className="absolute top-10 left-0 text-xs text-[#E74A3B]">
          {meta.error}
        </div>
      ) : null}
    </label>
  );
};
