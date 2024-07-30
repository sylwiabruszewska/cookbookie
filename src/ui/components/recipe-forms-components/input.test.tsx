import "@testing-library/jest-dom";
import { Formik, Form } from "formik";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { Input } from "@/ui/components/recipe-forms-components/input";

describe("Input Component", () => {
  const setup = (props: any) => {
    render(
      <Formik
        initialValues={{ [props.name || "test-name"]: "" }}
        onSubmit={jest.fn()}
      >
        <Form data-testid="test-form">
          <Input name="test-name" label="Test Label" {...props} />
        </Form>
      </Formik>
    );
  };

  it("should render correctly with default props", () => {
    setup({});
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Test Label");
  });

  it("should render with custom class", () => {
    setup({ className: "custom-class" });
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom-class");
  });

  it("should handle value changes", async () => {
    setup({});
    const input = screen.getByTestId("input") as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: "New Value" } });
    });

    await waitFor(() => {
      expect(input.value).toBe("New Value");
    });
  });

  it("should be readOnly when specified", () => {
    setup({ readOnly: true });
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toHaveAttribute("readOnly");
  });

  it("should have correct aria-describedby attribute", () => {
    setup({});
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("aria-describedby", "test-name-error");
  });
});
