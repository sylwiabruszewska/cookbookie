import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useField } from "formik";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface TextInputProps {
  id: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required?: boolean;
  iconID?: string;
  label: string;
  autocomplete?: "on" | "off";
  className?: string;
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
  className,
}) => {
  const [field, meta] = useField({ name, type });
  const [showPassword, setShowPassword] = useState(false);

  const valid = meta.touched && !meta.error;
  const invalid = meta.touched && meta.error;

  const stateColor = valid ? "#3CBC81" : invalid ? "#E74A3B" : "#5d5d5d";

  const inputType = showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <label
      className={clsx("relative mb-6 flex items-center w-full", className)}
    >
      <span className="sr-only">{label}</span>
      <div className="relative w-full">
        <input
          id={id}
          className={`w-full p-2 pl-10 border border-[--gray] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray] transition duration-150 ease-in-out`}
          placeholder={placeholder}
          required={required}
          type={inputType}
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
            <use href={`/icons/icons.svg#${iconID}`}></use>
          </svg>
        </div>

        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                aria-label="Hide"
                className="h-4 w-4 text-[--gray-medium]"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                aria-label="Show"
                className="h-4 w-4 text-[--gray-medium]"
              />
            )}
          </div>
        )}
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
