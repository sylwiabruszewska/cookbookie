import clsx from "clsx";
import { useField } from "formik";

const baseClass = "recipe-form-components";

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

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  label,
  className,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    helpers.setValue(selectedValue);
  };

  return (
    <>
      <label className="w-full">
        <span className="sr-only">{label}</span>
        <select
          id={id}
          className={clsx(baseClass, className)}
          value={field.value}
          onChange={handleChange}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {meta.touched && meta.error ? (
        <div className="error-text">{meta.error}</div>
      ) : null}
    </>
  );
};
