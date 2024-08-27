import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formik, Form, ErrorMessage } from "formik";
import { IconInput } from "@/ui/components/common/icon-input";

// Mock the i18n translation function for testing purposes
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

// Mock the FontAwesomeIcon component for testing purposes
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props: any) => (
    <span data-testid={`font-awesome-icon-${props.icon}`}>{props.icon}</span>
  ),
}));

describe("IconInput component", () => {
  const initialValues = { name: "" };
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  const setup = (props: any) => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={jest.fn()}
        validate={validate}
      >
        <Form data-testid="test-form">
          <IconInput name="name" {...props} data-testid="icon-input-field" />
          <ErrorMessage name="name">
            {(msg) => <div data-testid="error-message">{msg}</div>}
          </ErrorMessage>
        </Form>
      </Formik>
    );
  };

  it("should render the input field with the correct props", () => {
    setup({
      type: "text",
      label: "Username",
      iconID: "user-icon",
      className: "custom-input",
    });
    // Verify that the component is rendered and has the correct classes
    const iconInput = screen.getByTestId("icon-input-component");
    expect(iconInput).toBeInTheDocument();
    expect(iconInput).toHaveClass("w-full custom-input");

    // Verify that the input field is rendered with the correct type
    const input = screen.getByTestId("icon-input-field");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");

    // Verify that the SVG icon is rendered and has the correct href attribute
    const svgIcon = screen.getByTestId("icon-input-icon");
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon.querySelector("use")).toHaveAttribute(
      "href",
      "/icons/icons.svg#user-icon"
    );

    // Verify that the label is rendered and contains the correct text
    const label = screen.getByTestId("icon-input-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Username");
  });

  it("should toggle password visibility when the eye icon is clicked", () => {
    setup({ type: "password", label: "Password", iconID: "lock-icon" });

    const input = screen.getByTestId("icon-input-field");
    const toggler = screen.getByTestId("icon-input-toggler");

    // Simulate changing the input type
    fireEvent.click(toggler);

    // Verify that the input field type changes to "text"
    expect(input).toHaveAttribute("type", "text");
  });

  it("should render the password toggle icon correctly", () => {
    setup({ type: "password", label: "Password", iconID: "lock-icon" });

    const showPasswordIcon = screen.getByTestId("font-awesome-icon-eye");
    const input = screen.getByTestId("icon-input-field");

    // Simulate clicking the "show password" icon to toggle visibility
    fireEvent.click(showPasswordIcon);

    // Check if the input type has changed to "text" after clicking the icon
    expect(input).toHaveAttribute("type", "text");

    // Verify that the "hide password" icon is rendered after clicking the toggle icon
    const hidePasswordIcon = screen.getByTestId("font-awesome-icon-eye-slash");
    expect(hidePasswordIcon).toBeInTheDocument();
  });

  it("should change the icon color based on validation state", async () => {
    setup({ type: "text", label: "Username", iconID: "user-icon" });

    const input = screen.getByTestId("icon-input-field");
    const svgIcon = screen.getByTestId("icon-input-icon");

    // Initially, the input field is empty and not touched, so icon color should be default
    expect(svgIcon).toHaveAttribute("stroke", "#5d5d5d");

    // Simulate user interaction to trigger validation
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input); // Simulate losing focus to trigger validation

    // Submit the form to trigger validation
    const form = screen.getByTestId("test-form");
    fireEvent.submit(form);

    // Check if the icon color changes to red to indicate an error
    await waitFor(() =>
      expect(screen.queryByTestId("error-message")).toHaveTextContent(
        "Required"
      )
    );

    expect(svgIcon).toHaveAttribute("stroke", "#E74A3B");

    // Simulate input with valid data
    fireEvent.change(input, { target: { value: "Valid Input" } });
    fireEvent.blur(input);

    // The error message should disappear and the icon color should change to green
    await waitFor(() =>
      expect(screen.queryByTestId("error-message")).not.toBeInTheDocument()
    );
    expect(svgIcon).toHaveAttribute("stroke", "#3CBC81");
  });
});
