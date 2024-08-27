import {
  incrementTime,
  decrementTime,
  formatTime,
  parseTimeString,
} from "@/utils/timePickerHelpers";

describe("Time Helpers", () => {
  it("should increment time correctly", () => {
    expect(incrementTime({ hours: 0, minutes: 0 })).toEqual({
      hours: 0,
      minutes: 5,
    });
    expect(incrementTime({ hours: 0, minutes: 55 })).toEqual({
      hours: 1,
      minutes: 0,
    });
    expect(incrementTime({ hours: 1, minutes: 50 })).toEqual({
      hours: 1,
      minutes: 55,
    });
  });

  it("should decrement time correctly", () => {
    expect(decrementTime({ hours: 0, minutes: 5 })).toEqual({
      hours: 0,
      minutes: 5,
    });
    expect(decrementTime({ hours: 0, minutes: 10 })).toEqual({
      hours: 0,
      minutes: 5,
    });
    expect(decrementTime({ hours: 1, minutes: 0 })).toEqual({
      hours: 0,
      minutes: 55,
    });
    expect(decrementTime({ hours: 1, minutes: 5 })).toEqual({
      hours: 1,
      minutes: 0,
    });
  });

  it("should format time correctly", () => {
    expect(formatTime(0, 0)).toBe("0min");
    expect(formatTime(0, 5)).toBe("5min");
    expect(formatTime(1, 0)).toBe("1h 0min");
    expect(formatTime(1, 30)).toBe("1h 30min");
    expect(formatTime(2, 45)).toBe("2h 45min");
  });

  it("should parse time strings correctly", () => {
    expect(parseTimeString("5min")).toEqual({ hours: 0, minutes: 5 });
    expect(parseTimeString("1h 10min")).toEqual({ hours: 1, minutes: 10 });
    expect(parseTimeString("2h")).toEqual({ hours: 2, minutes: 0 });
    expect(parseTimeString("45min")).toEqual({ hours: 0, minutes: 45 });
    expect(parseTimeString("0h 0min")).toEqual({ hours: 0, minutes: 0 });
  });
});
