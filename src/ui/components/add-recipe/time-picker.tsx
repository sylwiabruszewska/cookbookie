import clsx from "clsx";

import { Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";

import {
  incrementTime,
  decrementTime,
  formatTime,
  parseTimeString,
} from "@/utils/timePickerHelpers";
import { Input } from "@ui/components/add-recipe/input";
import { Button } from "@ui/components/button";

interface TimePickerProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  initialTime?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  id,
  name,
  label,
  placeholder,
  initialTime,
}) => {
  const { setFieldValue } = useFormikContext<any>();
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    if (initialTime) {
      const parsedTime = parseTimeString(initialTime);
      setTime(parsedTime);
      setFieldValue(name, formatTime(parsedTime.hours, parsedTime.minutes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTime]);

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
        {({ field }: { field: any }) => (
          <Input
            id={id}
            {...field}
            type="text"
            label={label}
            placeholder={placeholder}
            readOnly
            value={formatTime(time.hours, time.minutes)}
          />
        )}
      </Field>

      <div className="flex space-x-1">
        <Button
          onClick={handleDecrement}
          disabled={time.hours === 0 && time.minutes <= 5}
          className={clsx("btn-green h-10 w-10 rounded-l-lg rounded-r-none", {
            "bg-[--gray] cursor-not-allowed hover:bg-[--gray] dark:hover:bg-[--gray-medium] dark:bg-[--gray-medium] dark:hover:text-white":
              time.hours === 0 && time.minutes <= 5,
          })}
        >
          -
        </Button>
        <Button
          onClick={handleIncrement}
          className="btn-green h-10 w-10 rounded-l-none rounded-r-lg"
        >
          +
        </Button>
      </div>
    </div>
  );
};
