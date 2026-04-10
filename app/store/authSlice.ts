import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

type RegisterPayload = {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthState = {
  register: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
  login: {
    loading: boolean;
    error: string | null;
  };
  token: string | null;
};

const initialState: AuthState = {
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

export const registerUser = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return rejectWithValue(
        errorData?.error || "Ocurrió un error al registrarse",
      );
    }
  } catch {
    return rejectWithValue("Error de conexión con el servidor");
  }
});

export const checkUserExists = createAsyncThunk<
  true,
  { email: string },
  { rejectValue: string }
>("auth/checkUserExists", async ({ email }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: "check_user",
      }),
    });

    if (res.status === 404) {
      return rejectWithValue("Usuario inexistente. Vuelve a intentarlo.");
    }

    if (!res.ok) {
      return rejectWithValue("Error de conexión con el servidor");
    }

    return true;
  } catch {
    return rejectWithValue("Error de conexión con el servidor");
  }
});

export const loginUser = createAsyncThunk<
  string,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return rejectWithValue("Contraseña incorrecta. Vuelve a intentarlo.");
    }

    const data = (await res.json()) as { token?: string };
    return data.token || "";
  } catch {
    return rejectWithValue("Error de conexión con el servidor");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearRegisterStatus(state) {
      state.register.error = null;
      state.register.success = false;
    },
    setRegisterError(state, action: { payload: string }) {
      state.register.error = action.payload;
    },
    clearLoginError(state) {
      state.login.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
        state.register.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.register.loading = false;
        state.register.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload || "Error inesperado";
      })
      .addCase(checkUserExists.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(checkUserExists.fulfilled, (state) => {
        state.login.loading = false;
      })
      .addCase(checkUserExists.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload || "Error inesperado";
      })
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.token = action.payload || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload || "Error inesperado";
      });
  },
});

export const { clearRegisterStatus, setRegisterError, clearLoginError } =
  authSlice.actions;

export default authSlice.reducer;
