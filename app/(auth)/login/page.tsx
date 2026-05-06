"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  checkUserExists,
  clearLoginError,
  loginUser,
} from "../../store/authSlice";

type LoginFormInputs = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth.login);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const emailRules = {
    required: "Ingresá tu email",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresá un email válido",
    },
    onChange: () => dispatch(clearLoginError()),
  };

  const passwordRules = {
    required: "Ingresá tu contraseña",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
    onChange: () => dispatch(clearLoginError()),
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    if (step === "email") {
      try {
        await dispatch(checkUserExists({ email: data.email ?? "" })).unwrap();
        setStep("password");
      } catch {
        // Error ya manejado en el estado global
      }
    } else {
      // Step Password - Intentar el Login Real
      try {
        const token = await dispatch(
          loginUser({
            email: data.email ?? "",
            password: data.password ?? "",
          }),
        ).unwrap();

        if (token) {
          // Login exitoso
        }
      } catch {
        // Error ya manejado en el estado global
      }
    }
  };

  const handleManualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger(step === "email" ? "email" : "password");
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const watchedPassword = watch("password");
  const validationMessage =
    step === "email" ? errors.email?.message : errors.password?.message;
  const hasError = !!error || !!validationMessage;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm px-4">
      <h1 className="text-white text-xl font-bold mb-6">
        {step === "email"
          ? "¡Hola! Ingresá tu e-mail"
          : "Ingresá tu contraseña"}
      </h1>

      <form
        onSubmit={handleManualSubmit}
        className="flex flex-col w-full"
        noValidate
      >
        {step === "email" ? (
          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", emailRules)}
              error={hasError}
              className="mb-1"
            />
            {errors.email?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.email.message}
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password", passwordRules)}
              error={hasError}
              hasValueOverride={!!watchedPassword}
              className="mb-1"
            />
            {errors.password?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.password.message}
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-4 mb-4 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Continuar"}
        </button>
        <Link href="/register" className="w-full">
          <button
            type="button"
            className="w-full bg-[#CECECE] text-black font-bold py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Crear cuenta
          </button>
        </Link>
      </form>

      <span
        className={`text-red-500 text-sm italic mt-4 text-center transition-opacity ${
          error ? "opacity-100" : "opacity-0 invisible"
        }`}
      >
        {error ||
          (step === "email"
            ? "Usuario inexistente. Vuelve a intentarlo."
            : "Contraseña incorrecta. Vuelve a intentarlo.")}
      </span>
    </div>
  );
}
