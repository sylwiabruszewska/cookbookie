import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Formik, Form } from "formik";
import { TextArea } from "@/ui/components/recipe-forms-components/textarea";

describe("TextArea Component", () => {
  const renderWithFormik = (initialValues = { description: "" }) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>
          <TextArea
            id="description"
            label="Description"
            className="textarea-styles"
          />
        </Form>
      </Formik>
    );
  };

  it("should render the textarea with the correct placeholder", () => {
    renderWithFormik();
    const textarea = screen.getByPlaceholderText("Description");
    expect(textarea).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    renderWithFormik();
    const textarea = screen.getByPlaceholderText("Description");
    expect(textarea).toHaveClass("textarea-styles");
  });

  it("should handle change event correctly", () => {
    renderWithFormik();
    const textarea = screen.getByPlaceholderText("Description");
    fireEvent.change(textarea, { target: { value: "Updated text" } });
    expect(textarea).toHaveValue("Updated text");
  });
});
