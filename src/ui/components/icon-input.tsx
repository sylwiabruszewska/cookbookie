import { useField } from "formik";

interface TextInputProps {
  id: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required?: boolean;
  iconID?: string;
  label: string;
  autocomplete?: "on" | "off";
}

const IconInput: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  placeholder,
  required = true,
  iconID,
  label,
  autocomplete = "on",
}) => {
  const [field, meta] = useField({ name, type });

  const valid = meta.touched && !meta.error;
  const invalid = meta.touched && meta.error;

  const stateColor = valid ? "#3CBC81" : invalid ? "#E74A3B" : "#d9d9d9";

  return (
    <label className="relative mb-6 flex items-center w-full">
      <span className="sr-only">{label}</span>
      <div className="relative w-full">
        <input
          id={id}
          className={`w-full p-2 pl-10 border border-[--gray] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray] transition duration-150 ease-in-out`}
          placeholder={placeholder}
          required={required}
          type={type}
          autoComplete={autocomplete}
          {...field}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5"
            stroke={stateColor}
            fill="transparent"
            viewBox="0 0 20 20"
          >
            <use href={`/icons.svg#${iconID}`}></use>
          </svg>
        </div>
        {meta.touched && meta.error ? (
          <div className="absolute t-10 l-0 text-xs text-[#E74A3B]">
            {meta.error}
          </div>
        ) : null}
      </div>
    </label>
  );
};

export default IconInput;
