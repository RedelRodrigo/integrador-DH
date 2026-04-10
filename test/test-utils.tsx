import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import authReducer from "../app/store/authSlice";

export const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

export function renderWithProviders(ui: ReactElement) {
  const store = createTestStore();

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  };
}
