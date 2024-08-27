import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Languages } from "@/ui/components/common/languages";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
    },
  }),
}));

const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
  usePathname: () => "/en",
}));

describe("Languages component", () => {
  beforeEach(() => {
    render(<Languages />);
  });

  test("renders language buttons", () => {
    expect(screen.getByTestId("switch-to-pl-btn")).toBeInTheDocument();
    expect(screen.getByTestId("switch-to-en-btn")).toBeInTheDocument();
    expect(screen.getByTestId("switch-to-es-btn")).toBeInTheDocument();
  });

  test("handles language change to Polish", () => {
    const polishButton = screen.getByTestId("switch-to-pl-btn");
    fireEvent.click(polishButton);

    expect(document.cookie).toContain("NEXT_LOCALE=pl");

    expect(pushMock).toHaveBeenCalledWith("/pl");
    expect(refreshMock).toHaveBeenCalled();
  });

  test("handles language change to English", () => {
    const englishButton = screen.getByTestId("switch-to-en-btn");
    fireEvent.click(englishButton);

    expect(document.cookie).toContain("NEXT_LOCALE=en");

    expect(pushMock).toHaveBeenCalledWith("/en");
    expect(refreshMock).toHaveBeenCalled();
  });

  test("handles language change to Spanish", () => {
    const spanishButton = screen.getByTestId("switch-to-es-btn");
    fireEvent.click(spanishButton);

    expect(document.cookie).toContain("NEXT_LOCALE=es");

    expect(pushMock).toHaveBeenCalledWith("/es");
    expect(refreshMock).toHaveBeenCalled();
  });
});
