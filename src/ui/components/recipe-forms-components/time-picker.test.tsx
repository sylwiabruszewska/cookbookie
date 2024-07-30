import "@testing-library/jest-dom";
import { Formik, Form } from "formik";
import {
  render,
  screen,
  fireEvent,
  within,
  act,
  waitFor,
} from "@testing-library/react";
import { TimePicker } from "@/ui/components/recipe-forms-components/time-picker";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

const initialTime = "10min";

const renderTimePicker = () => {
  return render(
    <Formik initialValues={{ time: initialTime }} onSubmit={jest.fn()}>
      <Form>
        <TimePicker
          id="time"
          name="time"
          label="Time"
          initialTime={initialTime}
        />
      </Form>
    </Formik>
  );
};

describe("TimePicker Component", () => {
  let timePickerContainer: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    renderTimePicker();

    timePickerContainer = screen.getByTestId("time-picker");
    input = within(timePickerContainer).getByRole(
      "textbox"
    ) as HTMLInputElement;
  });

  it("should display initial time", () => {
    expect(input.value).toBe("10min");
  });

  it("should increment time", async () => {
    const incrementButton = within(timePickerContainer).getByRole("button", {
      name: /increment_time/,
    });

    act(() => {
      fireEvent.click(incrementButton);
    });
    await waitFor(() => {
      expect(input.value).toBe("15min");
    });
  });

  it("should decrement time", async () => {
    const decrementButton = within(timePickerContainer).getByRole("button", {
      name: /decrement_time/,
    });

    act(() => {
      fireEvent.click(decrementButton);
    });

    await waitFor(() => {
      expect(input.value).toBe("5min");
    });
  });

  it("should update the input value when changed", async () => {
    act(() => {
      fireEvent.change(input, { target: { value: "30min" } });
    });

    await waitFor(() => {
      expect(input.value).toBe("30min");
    });
  });
});
