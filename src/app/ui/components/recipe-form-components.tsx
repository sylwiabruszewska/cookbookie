import clsx from "clsx";

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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  required = true,
  label,
  className,
  value,
  readOnly,
  onChange,
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
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
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

//////////   TEAXTAREA   //////////
interface TextAreaProps {
  id: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <textarea
      id={id}
      className={clsx(baseClass, className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

//////////   TIME PICKER   //////////
import {
  SetHoursFunction,
  SetMinutesFunction,
} from "@/app/utils/timePickerHelpers";

interface TimePickerProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDecrement: (
    minutes: number,
    hours: number,
    setHours: SetHoursFunction,
    setMinutes: SetMinutesFunction
  ) => void;
  onIncrement: (
    minutes: number,
    setHours: SetHoursFunction,
    setMinutes: SetMinutesFunction
  ) => void;
  hours: number;
  minutes: number;
  setHours: SetHoursFunction;
  setMinutes: SetMinutesFunction;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onDecrement,
  onIncrement,
  hours,
  minutes,
  setHours,
  setMinutes,
}) => {
  return (
    <div className="flex space-x-2">
      <Input
        id={id}
        name={name}
        type="text"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly
      />
      <div className="flex space-x-1">
        <button
          onClick={() => onDecrement(minutes, hours, setHours, setMinutes)}
          disabled={value === "" || (hours === 0 && minutes === 5)}
          className={clsx(
            "bg-[--primary-color] text-white hover:bg-[--gray-dark] px-4 h-10 rounded-l-lg",
            {
              "bg-gray-300 cursor-not-allowed hover:bg-gray-300":
                value === "" || (hours === 0 && minutes === 5),
            }
          )}
        >
          -
        </button>
        <button
          onClick={() => onIncrement(minutes, setHours, setMinutes)}
          className="bg-[--primary-color] text-white hover:bg-[--gray-dark] px-4 h-10 rounded-r-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};
