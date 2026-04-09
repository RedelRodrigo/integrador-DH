interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary text-black hover:bg-green-600",
  outline:
    "bg-transparent border border-primary text-primary hover:bg-primary hover:text-black",
};

export const Button = ({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded transition-colors duration-300 cursor-pointer ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
