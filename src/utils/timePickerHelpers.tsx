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

export const parseTimeString = (timeString: string) => {
  const timeParts = timeString.split(" ").map((part) => part.trim());
  let hours = 0;
  let minutes = 0;

  for (let i = 0; i < timeParts.length; i++) {
    const part = timeParts[i];
    if (part.includes("h")) {
      hours = parseInt(part);
    } else if (part.includes("min")) {
      minutes = parseInt(part);
    }
  }

  return { hours, minutes };
};
