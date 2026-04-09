"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../components/Input";

type LoginFormInputs = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

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
    onChange: () => setApiError(false),
  };

  const passwordRules = {
    required: "Ingresá tu contraseña",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
    onChange: () => setApiError(false),
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setApiError(false);

    if (step === "email") {
      try {
        const res = await fetch(
          "https://digitalmoney.digitalhouse.com/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: "check_user", // Contraseña genérica para verificar existencia
            }),
          },
        );

        if (res.status === 404) {
          setApiError(true); // Usuario no existe
        } else {
          // El usuario existe
          setStep("password");
        }
      } catch {
        setApiError(true);
      } finally {
        setLoading(false);
      }
    } else {
      // Step Password - Intentar el Login Real
      try {
        const res = await fetch(
          "https://digitalmoney.digitalhouse.com/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          },
        );

        if (res.ok) {
          const resData = await res.json();
          console.log("Login exitoso. Token recibido", resData.token);
          // router.push("/dashboard"); o /home
        } else {
          setApiError(true); // Contraseña incorrecta
        }
      } catch {
        setApiError(true);
      } finally {
        setLoading(false);
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
  const hasError = apiError || !!validationMessage;

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
          apiError ? "opacity-100" : "opacity-0 invisible"
        }`}
      >
        {step === "email"
          ? "Usuario inexistente. Vuelve a intentarlo."
          : "Contraseña incorrecta. Vuelve a intentarlo."}
      </span>
    </div>
  );
}
