import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  hasValueOverride?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", hasValueOverride, ...props }, ref) => {
    let baseClass =
      "w-full px-4 py-3 rounded-lg bg-white text-black font-sans focus:outline-none h-[52px] border transition-colors";

    const isPassword =
      props.type === "password" ||
      props.name === "password" ||
      props.name === "confirmPassword";

    const hasValue =
      hasValueOverride !== undefined
        ? hasValueOverride
        : props.value && props.value.toString().length > 0;

    if (isPassword && hasValue) {
      baseClass += " tracking-[0.15em] font-medium text-[70px]";
    } else {
      baseClass += " text-base";
    }

    if (error) {
      baseClass += " border-red-500";
    } else {
      baseClass += " border-transparent";
    }

    return (
      <input
        ref={ref}
        className={`${baseClass} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
