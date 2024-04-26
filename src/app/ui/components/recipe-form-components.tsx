import clsx from "clsx";

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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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

import { useState, useEffect } from "react";

export const TimePicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newMinutes = minutes + 5;

    if (newMinutes >= 60) {
      setHours((prevHours) => prevHours + 1);
      setMinutes((prevMinutes) => newMinutes % 60);
    } else {
      setMinutes((prevMinutes) => prevMinutes + 5);
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newMinutes = minutes - 5;

    if (newMinutes < 0) {
      if (hours > 0) {
        setHours((prevHours) => prevHours - 1);
        setMinutes((prevMinutes) => 60 + newMinutes);
      }
    } else {
      setMinutes((prevMinutes) => prevMinutes - 5);
    }
  };

  const formatTime = (hours: number, minutes: number) => {
    const formattedHours = hours > 0 ? `${hours}h` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}min` : "";
    setFormattedTime(`${formattedHours} ${formattedMinutes}`);
  };

  useEffect(() => {
    if (hours !== 0 || minutes !== 0) {
      formatTime(hours, minutes);
    }
  }, [hours, minutes]);

  return (
    <div className="flex space-x-2">
      <Input
        id="counter"
        name="counter"
        type="text"
        label="Cooking time"
        placeholder="Cooking time"
        value={formattedTime}
        onChange={() => {}}
        readOnly
      />
      <div className="flex space-x-1">
        <button
          onClick={handleDecrement}
          disabled={formattedTime === "" || (hours === 0 && minutes === 5)}
          className={clsx(
            "bg-[--primary-color] text-white hover:bg-[--gray-dark] px-4 h-10 rounded-l-lg",
            {
              "bg-gray-300 cursor-not-allowed hover:bg-gray-300":
                formattedTime === "" || (hours === 0 && minutes === 5),
            }
          )}
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          className="bg-[--primary-color] text-white hover:bg-[--gray-dark] px-4 h-10 rounded-r-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};
