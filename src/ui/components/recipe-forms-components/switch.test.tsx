import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Formik, Form } from "formik";
import { Switch } from "@/ui/components/recipe-forms-components/switch";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Switch Component", () => {
  const renderWithFormik = (initialValues = { switchValue: true }) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>
          <Switch name="switchValue" />
        </Form>
      </Formik>
    );
  };

  it("should display 'public' when switch is initially true", () => {
    renderWithFormik({ switchValue: true });

    expect(screen.getByText("public")).toBeInTheDocument();
  });

  it("should toggle the switch between 'public' and 'private'", () => {
    renderWithFormik();

    // Initially, it should display 'public'
    expect(screen.getByText("public")).toBeInTheDocument();

    // Click to toggle the switch
    fireEvent.click(screen.getByRole("button"));

    // Check if the switch now displays 'private'
    expect(screen.getByText("private")).toBeInTheDocument();
  });

  it("should apply the correct CSS classes based on the switch state", () => {
    renderWithFormik();

    // Check initial CSS classes
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[--gray-light]");

    // Click to toggle the switch
    fireEvent.click(button);

    // Check if classes has changed
    const updatedButton = screen.getByRole("button");
    expect(updatedButton).toHaveClass("bg-[--primary-color]");
  });
});
