import clsx from "clsx";
import { useState } from "react";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const baseClass =
  "w-full h-10 p-2 pl-10 border border-[--gray] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray] transition duration-150 ease-in-out bg-[--background] dark:bg-transparent dark:text-[--font] dark:placeholder-[--gray]";

interface TextInputProps {
  name: string;
  type: "text" | "email" | "password";
  iconID?: string;
  label: string;
  autocomplete?: "on" | "off";
  className?: string;
}

export const IconInput: React.FC<TextInputProps> = ({
  name,
  type,
  iconID,
  label,
  autocomplete = "off",
  className,
}) => {
  const { t } = useTranslation(["dashboard"]);

  const [field, meta] = useField({ name, type });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const valid = meta.touched && !meta.error;
  const invalid = meta.touched && meta.error;

  const stateColor = valid ? "#3CBC81" : invalid ? "#E74A3B" : "#5d5d5d";

  const inputType = passwordVisible ? "text" : type;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <label
      className={clsx("w-full", className)}
      data-testid="icon-input-component"
    >
      <span className="sr-only" data-testid="icon-input-label">
        {label}
      </span>
      <div className="relative w-full">
        <input
          id={name}
          {...field}
          className={baseClass}
          placeholder={label}
          type={inputType}
          autoComplete={autocomplete}
          aria-describedby={`${name}-error`}
          data-testid="icon-input-field"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5"
            stroke={stateColor}
            fill="transparent"
            viewBox="0 0 20 20"
            data-testid="icon-input-icon"
          >
            <use href={`/icons/icons.svg#${iconID}`}></use>
          </svg>
        </div>

        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
            data-testid="icon-input-toggler"
          >
            {passwordVisible ? (
              <FontAwesomeIcon
                icon="eye-slash"
                aria-label={t("hide")}
                className="h-4 w-4 text-[--gray-medium]"
                data-testid="font-awesome-icon-eye-slash"
              />
            ) : (
              <FontAwesomeIcon
                icon="eye"
                aria-label={t("show")}
                className="h-4 w-4 text-[--gray-medium]"
                data-testid="font-awesome-icon-eye"
              />
            )}
          </div>
        )}
      </div>
    </label>
  );
};
