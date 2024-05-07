import { Dispatch, SetStateAction } from "react";

export type SetHoursFunction = Dispatch<SetStateAction<number>>;
export type SetMinutesFunction = Dispatch<SetStateAction<number>>;
export type SetFormattedTimeFunction = Dispatch<SetStateAction<string>>;

// export const handleIncrement = (
//   minutes: number
// ): { hours: number; minutes: number } => {
//   const newMinutes = minutes + 5;
//   let hours = Math.floor(newMinutes / 60);
//   let updatedMinutes = newMinutes % 60;

//   return { hours, minutes: updatedMinutes };
// };

// export const handleDecrement = (
//   minutes: number,
//   hours: number
// ): { hours: number; minutes: number } => {
//   const newMinutes = minutes - 5;
//   let updatedMinutes: number;

//   if (newMinutes < 0) {
//     hours = Math.max(0, hours - 1);
//     updatedMinutes = 60 + newMinutes;
//   } else {
//     updatedMinutes = newMinutes;
//   }

//   return { hours, minutes: updatedMinutes };
// };

export const formatTime = (hours: number, minutes: number) => {
  const formattedHours = hours > 0 ? `${hours}h` : "";
  const formattedMinutes = minutes > 0 ? `${minutes}min` : "";
  const formattedTime = `${formattedHours} ${formattedMinutes}`.trim();

  return formattedTime;
};

export const handleDecrement = (
  values: any,
  name: string,
  setFieldValue: (name: string, value: any) => void
) => {
  const timeArray = values[name].split(" ");
  let hours = parseInt(timeArray[0].replace("h", "")) || 0;
  let minutes = parseInt(timeArray[1].replace("min", "")) || 0;

  if (minutes >= 5) {
    minutes -= 5;
  } else {
    if (hours > 0) {
      hours -= 1;
      minutes = 60 - (5 - minutes);
    }
  }

  setFieldValue(name, formatTime(hours, minutes));
};

export const handleIncrement = (
  values: any,
  name: string,
  setFieldValue: (name: string, value: any) => void
) => {
  const currentValue = values[name] || "0h 0min";
  const timeArray = currentValue.split(" ");
  let hours = parseInt(timeArray[0].replace("h", "")) || 0;
  let minutes = parseInt(timeArray[1].replace("min", "")) || 0;

  if (minutes < 55) {
    minutes += 5;
  } else {
    hours += 1;
    minutes = minutes + 5 - 60;
  }

  setFieldValue(name, formatTime(hours, minutes));
};
