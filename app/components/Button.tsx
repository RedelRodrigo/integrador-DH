interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "gray";
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-black hover:bg-green-600",
  outline:
    "bg-transparent border border-primary text-primary hover:bg-primary hover:text-black",
  gray: "bg-[#3A393E] text-white hover:bg-gray-600",
};

export const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded transition-colors duration-300 cursor-pointer ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
