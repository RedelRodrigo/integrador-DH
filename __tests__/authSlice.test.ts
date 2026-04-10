import { describe, it } from "node:test";
import authReducer, {
  clearLoginError,
  clearRegisterStatus,
  checkUserExists,
  loginUser,
  registerUser,
  setRegisterError,
} from "../app/store/authSlice";
import { expect } from "@playwright/test";

const initialState = {
  register: {
    loading: false,
    error: null,
    success: false,
  },
  login: {
    loading: false,
    error: null,
  },
  token: null,
};

describe("authSlice", () => {
  it("clears register status", () => {
    const state = {
      ...initialState,
      register: { loading: false, error: "err", success: true },
    };

    const next = authReducer(state, clearRegisterStatus());

    expect(next.register.error).toBeNull();
    expect(next.register.success).toBe(false);
  });

  it("sets register error", () => {
    const next = authReducer(initialState, setRegisterError("boom"));
    expect(next.register.error).toBe("boom");
  });

  it("clears login error", () => {
    const state = {
      ...initialState,
      login: { loading: false, error: "err" },
    };

    const next = authReducer(state, clearLoginError());
    expect(next.login.error).toBeNull();
  });

  it("handles registerUser pending/fulfilled", () => {
    const pendingState = authReducer(
      initialState,
      registerUser.pending("", {
        dni: 1,
        email: "a@b.com",
        firstname: "A",
        lastname: "B",
        password: "Passw0rd!",
        phone: "123",
      }),
    );

    expect(pendingState.register.loading).toBe(true);
    expect(pendingState.register.error).toBeNull();

    const fulfilledState = authReducer(
      pendingState,
      registerUser.fulfilled(undefined, "", {
        dni: 1,
        email: "a@b.com",
        firstname: "A",
        lastname: "B",
        password: "Passw0rd!",
        phone: "123",
      }),
    );

    expect(fulfilledState.register.loading).toBe(false);
    expect(fulfilledState.register.success).toBe(true);
  });

  it("handles checkUserExists rejected", () => {
    const next = authReducer(
      initialState,
      checkUserExists.rejected(
        new Error("nope"),
        "",
        { email: "a@b.com" },
        "Usuario inexistente. Vuelve a intentarlo.",
      ),
    );

    expect(next.login.loading).toBe(false);
    expect(next.login.error).toBe("Usuario inexistente. Vuelve a intentarlo.");
  });

  it("handles loginUser fulfilled", () => {
    const next = authReducer(
      initialState,
      loginUser.fulfilled("token123", "", {
        email: "a@b.com",
        password: "Passw0rd!",
      }),
    );

    expect(next.login.loading).toBe(false);
    expect(next.token).toBe("token123");
  });
});
