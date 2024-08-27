import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Formik, Form } from "formik";
import {
  ReactSelect,
  OptionType,
} from "@/ui/components/recipe-forms-components/react-select";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const options: OptionType[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

const renderWithFormik = (props = {}) => {
  return render(
    <Formik initialValues={{ select: "" }} onSubmit={jest.fn()}>
      <Form>
        <ReactSelect
          id="select"
          name="select"
          label="Select"
          options={options}
          {...props}
        />
      </Form>
    </Formik>
  );
};

describe("ReactSelect Component", () => {
  it("should handle option selection", async () => {
    renderWithFormik();
    const selectInput = screen.getByRole("combobox");
    fireEvent.keyDown(selectInput, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Option 1"));
    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });
  });

  it("should handle option creation", async () => {
    renderWithFormik({ isCreatable: true });
    const selectInput = screen.getByRole("combobox");
    fireEvent.change(selectInput, { target: { value: "New Option" } });
    fireEvent.keyDown(selectInput, { key: "Enter" });
    await waitFor(() => {
      expect(screen.getByText("New Option")).toBeInTheDocument();
    });
  });

  it("should call onChange prop when an option is selected", async () => {
    const onChangeMock = jest.fn();
    renderWithFormik({ onChange: onChangeMock });
    const selectInput = screen.getByRole("combobox");
    fireEvent.keyDown(selectInput, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Option 1"));
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(
        { value: "option1", label: "Option 1" },
        expect.anything()
      );
    });
  });

  it("should call onCreateOption prop when a new option is created", async () => {
    const onCreateOptionMock = jest.fn();
    renderWithFormik({ isCreatable: true, onCreateOption: onCreateOptionMock });
    const selectInput = screen.getByRole("combobox");
    fireEvent.change(selectInput, { target: { value: "New Option" } });
    fireEvent.keyDown(selectInput, { key: "Enter" });
    await waitFor(() => {
      expect(onCreateOptionMock).toHaveBeenCalledWith("New Option");
    });
  });

  it("should apply selected background color to selected option", async () => {
    renderWithFormik();

    const selectInput = screen.getByRole("combobox");
    fireEvent.mouseDown(selectInput);

    // pick option
    const option1 = await screen.findByText("Option 1");
    fireEvent.click(option1);

    // check if option has default bg color from react select library
    await waitFor(() => {
      expect(option1).toHaveStyle("background-color: #B2D4FF");
    });

    // close dropdown
    fireEvent.mouseDown(selectInput);

    // check color of selected option
    await waitFor(() => {
      expect(option1).toHaveStyle("background-color: #B2D4FF");
    });
  });
});
