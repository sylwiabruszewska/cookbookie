import { Dispatch, SetStateAction } from "react";

export type SetHoursFunction = Dispatch<SetStateAction<number>>;
export type SetMinutesFunction = Dispatch<SetStateAction<number>>;
export type SetFormattedTimeFunction = Dispatch<SetStateAction<string>>;

export const handleIncrement = (
  minutes: number,
  setHours: SetHoursFunction,
  setMinutes: SetMinutesFunction
) => {
  const newMinutes = minutes + 5;
  if (newMinutes >= 60) {
    setHours((prevHours: number) => prevHours + 1);
    setMinutes(() => newMinutes % 60);
  } else {
    setMinutes((prevMinutes: number) => prevMinutes + 5);
  }
};

export const handleDecrement = (
  minutes: number,
  hours: number,
  setHours: SetHoursFunction,
  setMinutes: SetMinutesFunction
) => {
  const newMinutes = minutes - 5;
  if (newMinutes < 0) {
    if (hours > 0) {
      setHours((prevHours: number) => prevHours - 1);
      setMinutes(() => 60 + newMinutes);
    }
  } else {
    setMinutes((prevMinutes: number) => prevMinutes - 5);
  }
};

export const formatTime = (
  hours: number,
  minutes: number,
  setFormattedTime: SetFormattedTimeFunction
) => {
  const formattedHours = hours > 0 ? `${hours}h` : "";
  const formattedMinutes = minutes > 0 ? `${minutes}min` : "";
  setFormattedTime(`${formattedHours} ${formattedMinutes}`);
};
