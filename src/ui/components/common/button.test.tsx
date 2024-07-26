import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/ui/components/common/button";

describe("Button component", () => {
  it("should render with given children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should apply the default type attribute", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toHaveAttribute("type", "button");
  });

  it("should apply a custom type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");
  });

  it("should handle onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional class names", () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByText("Click me")).toHaveClass("custom-class");
  });

  it("should apply aria-label attribute", () => {
    render(<Button ariaLabel="Button aria label">Click me</Button>);
    expect(screen.getByText("Click me")).toHaveAttribute(
      "aria-label",
      "Button aria label"
    );
  });
});
