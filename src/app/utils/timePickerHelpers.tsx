interface Time {
  hours: number;
  minutes: number;
}

export const incrementTime = (time: Time): Time => {
  const updatedMinutes = time.minutes + 5;
  const updatedHours = time.hours + Math.floor(updatedMinutes / 60);
  const minutes = updatedMinutes % 60;
  return { hours: updatedHours, minutes };
};

export const decrementTime = (time: Time): Time => {
  let updatedMinutes = time.minutes - 5;
  let updatedHours = time.hours;

  if (updatedMinutes < 0) {
    updatedMinutes += 60;
    updatedHours -= 1;
    if (updatedHours < 0) {
      updatedHours = 0;
    }
  }

  return { hours: updatedHours, minutes: updatedMinutes };
};

export const formatTime = (hours: number, minutes: number): string => {
  if (hours === 0) {
    return `${minutes}min`;
  } else {
    return `${hours}h ${minutes}min`;
  }
};
