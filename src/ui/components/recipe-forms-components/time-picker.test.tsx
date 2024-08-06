import "@testing-library/jest-dom";
import { Formik, Form } from "formik";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
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
  let input: HTMLInputElement;

  beforeEach(() => {
    renderTimePicker();
    input = screen.getByTestId("time-picker");
  });

  it("should display initial time", () => {
    expect(input.value).toBe("10min");
  });

  it("should increment time", async () => {
    const incrementButton = screen.getByTestId("increment-btn");

    act(() => {
      fireEvent.click(incrementButton);
    });
    await waitFor(() => {
      expect(input.value).toBe("15min");
    });
  });

  it("should decrement time", async () => {
    const decrementButton = screen.getByTestId("decrement-btn");

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
