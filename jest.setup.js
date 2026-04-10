import "@testing-library/jest-dom";
import { createElement } from "react";

jest.mock("next/link", () => {
  return function Link({ href, children }) {
    return createElement("a", { href }, children);
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
