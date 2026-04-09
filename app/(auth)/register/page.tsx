"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../components/Input";
import { useRouter } from "next/navigation";

type RegisterInputs = {
  nombre?: string;
  apellido?: string;
  dni?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  telefono?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const watchedPassword = watch("password");

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://digitalmoney.digitalhouse.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dni: Number(data.dni),
            email: data.email,
            firstname: data.nombre,
            lastname: data.apellido,
            password: data.password,
            phone: data.telefono,
          }),
        },
      );

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Ocurrió un error al registrarse");
      }
    } catch {
      setErrorMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    setErrorMessage("Revisá los campos marcados");
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full flex-grow mt-24">
        <div className="w-24 h-24 rounded-full border-[6px] border-[#C1FD35] flex items-center justify-center mb-16">
          <svg
            className="w-12 h-12 text-[#C1FD35]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="w-full max-w-sm bg-primary text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity h-[52px]"
        >
          Continuar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl px-4 py-8 mx-auto mt-2 gap-2">
      <h1 className="text-white text-xl font-bold mb-8">Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="w-full flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Nombre*"
              {...register("nombre", {
                required: "Ingresá tu nombre",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.nombre}
            />
            {errors.nombre?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.nombre.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Apellido*"
              {...register("apellido", {
                required: "Ingresá tu apellido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.apellido}
            />
            {errors.apellido?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.apellido.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="DNI*"
              {...register("dni", {
                required: "Ingresá tu DNI",
                minLength: { value: 6, message: "Mínimo 6 dígitos" },
                pattern: { value: /^\d+$/, message: "Solo números" },
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                },
              })}
              error={!!errors.dni}
            />
            {errors.dni?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.dni.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="Correo electrónico*"
              {...register("email", {
                required: "Ingresá tu email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresá un email válido",
                },
              })}
              error={!!errors.email}
            />
            {errors.email?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-300 text-sm mt-[-4px]">
          Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
          carácter especial, una mayúscula y un número
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col">
            <Input
              type="password"
              placeholder="Contraseña*"
              {...register("password", {
                required: "Ingresá tu contraseña",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_+\[\]=\/\\]).{6,20}$/,
                  message:
                    "Entre 6 y 20 caracteres, con mayúscula, número y símbolo",
                },
              })}
              hasValueOverride={!!watchedPassword}
              error={!!errors.password}
            />
            {errors.password?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              type="password"
              placeholder="Confirmar contraseña*"
              {...register("confirmPassword", {
                required: "Confirmá tu contraseña",
                validate: (val) =>
                  watchedPassword === val || "Las contraseñas no coinciden",
              })}
              hasValueOverride={!!watch("confirmPassword")}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Input
              type="tel"
              placeholder="Teléfono*"
              {...register("telefono", {
                required: "Ingresá tu teléfono",
                minLength: { value: 8, message: "Mínimo 8 dígitos" },
                pattern: { value: /^\d+$/, message: "Solo números" },
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                },
              })}
              className="self-start"
              error={!!errors.telefono}
            />
            {errors.telefono?.message && (
              <span className="text-red-500 text-sm italic">
                {errors.telefono.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity h-[52px] disabled:opacity-50"
            >
              {loading ? "Cargando..." : "Crear cuenta"}
            </button>
            <span
              className={`text-red-500 text-sm italic mt-2 text-center transition-opacity ${
                errorMessage ? "opacity-100" : "opacity-0 invisible"
              }`}
            >
              {errorMessage || "Error temporal"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
