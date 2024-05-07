import clsx from "clsx";
import { useField } from "formik";

//////////   COMMON   //////////
const baseClass =
  "w-full h-10 p-2 bg-[#efefef] rounded-md focus:outline-none focus:ring-2 focus:ring-[--gray-dark]";

//////////   INPUT   //////////
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

//////////   SELECT   //////////
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
    <label className="relative mb-4 flex items-center w-full">
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

      {meta.touched && meta.error ? (
        <div className="absolute top-10 left-0 text-xs text-[#E74A3B]">
          {meta.error}
        </div>
      ) : null}
    </label>
  );
};

//////////   TEAXTAREA   //////////
interface TextAreaProps {
  id: string;
  placeholder: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  className,
}) => {
  const [field, meta, helpers] = useField({ name: id });

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    helpers.setValue(event.target.value);
  };

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        {...field}
        className={clsx(baseClass, className, "relative")}
        placeholder={placeholder}
        onChange={handleChange}
      ></textarea>
      {meta.touched && meta.error ? (
        <div className="absolute top-10 left-0 text-xs text-[#E74A3B]">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

//////////   TIME PICKER   //////////
import { formatTime } from "@/app/utils/timePickerHelpers";
import { Field, FieldProps, useFormikContext } from "formik";
import { FormikValues } from "formik";
import {
  handleDecrement,
  handleIncrement,
} from "@/app/utils/timePickerHelpers";

interface TimePickerProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  id,
  name,
  label,
  placeholder,
}) => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const isMinimumTime = (time: string) => {
    const timeArray = time.split(" ");
    const hours = parseInt(timeArray[0].replace("h", "")) || 0;
    const minutes = parseInt(timeArray[1].replace("min", "")) || 0;
    return hours === 0 && minutes <= 5;
  };

  return (
    <div className="flex space-x-2">
      <Field name={name}>
        {({ field }: { field: any; meta: any }) => (
          <>
            <Input
              id={id}
              {...field}
              type="text"
              label={label}
              placeholder={placeholder}
              readOnly
              value={values[name] || ""}
            />

            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => handleDecrement(values, name, setFieldValue)}
                disabled={values[name] === "" || isMinimumTime(values[name])}
                className={clsx(
                  "bg-[--primary-color] text-white hover:bg-[--gray-dark] h-10 w-10 rounded-l-lg",
                  {
                    "bg-gray-300 cursor-not-allowed hover:bg-gray-300":
                      values[name] === "" || isMinimumTime(values[name]),
                  }
                )}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => handleIncrement(values, name, setFieldValue)}
                className="bg-[--primary-color] text-white hover:bg-[--gray-dark] h-10 w-10 rounded-r-lg"
              >
                +
              </button>
            </div>
          </>
        )}
      </Field>
    </div>
  );
};
