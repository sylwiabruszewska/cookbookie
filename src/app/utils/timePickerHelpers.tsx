export const handleIncrement = (
  minutes: number,
  setHours: Function,
  setMinutes: Function
) => {
  const newMinutes = minutes + 5;
  if (newMinutes >= 60) {
    setHours((prevHours: number) => prevHours + 1);
    setMinutes((prevMinutes: number) => newMinutes % 60);
  } else {
    setMinutes((prevMinutes: number) => prevMinutes + 5);
  }
};

export const handleDecrement = (
  minutes: number,
  hours: number,
  setHours: Function,
  setMinutes: Function
) => {
  const newMinutes = minutes - 5;
  if (newMinutes < 0) {
    if (hours > 0) {
      setHours((prevHours: number) => prevHours - 1);
      setMinutes((prevMinutes: number) => 60 + newMinutes);
    }
  } else {
    setMinutes((prevMinutes: number) => prevMinutes - 5);
  }
};

export const formatTime = (
  hours: number,
  minutes: number,
  setFormattedTime: Function
) => {
  const formattedHours = hours > 0 ? `${hours}h` : "";
  const formattedMinutes = minutes > 0 ? `${minutes}min` : "";
  setFormattedTime(`${formattedHours} ${formattedMinutes}`);
};
