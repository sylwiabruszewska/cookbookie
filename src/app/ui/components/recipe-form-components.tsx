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
import { Field, FieldProps, useFormikContext } from "formik";
import { FormikValues } from "formik";
import { useState } from "react";
import {
  incrementTime,
  decrementTime,
  formatTime,
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
  const { setFieldValue, values } = useFormikContext<any>();
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  const handleIncrement = () => {
    const updatedTime = incrementTime(time);
    setTime(updatedTime);
    setFieldValue(name, formatTime(updatedTime.hours, updatedTime.minutes));
  };

  const handleDecrement = () => {
    const updatedTime = decrementTime(time);
    setTime(updatedTime);
    setFieldValue(name, formatTime(updatedTime.hours, updatedTime.minutes));
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
              value={formatTime(time.hours, time.minutes)}
            />

            <div className="flex space-x-1">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={time.hours === 0 && time.minutes <= 5}
                className={clsx(
                  "bg-[--primary-color] text-white hover:bg-[--gray-dark] h-10 w-10 rounded-l-lg",
                  {
                    "bg-gray-300 cursor-not-allowed hover:bg-gray-300":
                      time.hours === 0 && time.minutes <= 5,
                  }
                )}
              >
                -
              </button>
              <button
                type="button"
                onClick={handleIncrement}
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
