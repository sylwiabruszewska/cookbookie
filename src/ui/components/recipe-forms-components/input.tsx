import clsx from "clsx";
import { useField } from "formik";

const baseClass = "recipe-form-components";

interface InputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  className?: string;
  readOnly?: boolean;
  "data-testid"?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  label,
  className,
  readOnly,
  "data-testid": dataTestId,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.value);
  };

  return (
    <label className="w-full">
      <span className="sr-only">{label}</span>
      <input
        id={id}
        {...field}
        type={type}
        placeholder={label}
        className={clsx(baseClass, className)}
        readOnly={readOnly}
        onChange={handleChange}
        aria-describedby={`${name}-error`}
        data-testid={dataTestId}
      />
    </label>
  );
};
