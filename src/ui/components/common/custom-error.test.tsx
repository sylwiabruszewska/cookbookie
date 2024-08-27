import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Formik, Form, Field } from "formik";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";

describe("CustomErrorMessage component", () => {
  const initialValues = { name: "" };
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  const setup = (props: any = {}) => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={jest.fn()}
        validate={validate}
      >
        <Form data-testid="test-form">
          <Field name="name" />
          <CustomErrorMessage name="name" {...props} />
        </Form>
      </Formik>
    );
  };

  it("should render without error message initially", () => {
    setup();
    expect(screen.queryByText("Required")).not.toBeInTheDocument();
  });

  it("should display error message when there is an error", async () => {
    setup();

    // Simulate form submission to trigger validation
    const form = screen.getByTestId("test-form");
    fireEvent.submit(form);

    // Wait for the error message to appear
    expect(await screen.findByText("Required")).toBeInTheDocument();
  });

  it("should have the appropriate ARIA attributes", () => {
    setup();

    expect(screen.getByTestId("custom-error")).toHaveAttribute(
      "aria-live",
      "polite"
    );
    expect(screen.getByTestId("custom-error")).toHaveAttribute(
      "aria-atomic",
      "true"
    );
  });

  it("should apply additional class names", () => {
    const customClassName = "custom-error-class";
    setup({ className: customClassName });

    expect(screen.getByTestId("custom-error")).toHaveClass(customClassName);
  });
});
