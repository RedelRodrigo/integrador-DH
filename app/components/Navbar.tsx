import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

export interface NavAction {
  label: string;
  href: string;
  variant: "primary" | "outline" | "gray";
}

interface NavbarProps {
  actions?: NavAction[];
  variant?: "dark" | "primary";
  logoSrc?: string;
}

const DEFAULT_ACTIONS: NavAction[] = [
  { label: "Ingresar", href: "/login", variant: "outline" },
  { label: "Crear cuenta", href: "/register", variant: "primary" },
];

const navbarStyles: Record<string, string> = {
  dark: "bg-dark",
  primary: "bg-primary",
};

export const Navbar = ({
  actions = DEFAULT_ACTIONS,
  variant = "dark",
  logoSrc = "/logo01.svg",
}: NavbarProps) => {
  return (
    <nav
      className={`${navbarStyles[variant]} w-full h-16 md:h-20 flex items-center px-4 sm:px-6 lg:px-10 shrink-0`}
    >
      <div className="w-full flex items-center justify-between flex-wrap gap-3">
        <Link href="/" className="inline-block w-fit">
          <Image
            src={logoSrc}
            alt="Digital Money House logo"
            width={87}
            height={33}
            loading="eager"
          />
        </Link>
        {actions.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
            {actions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button
                  variant={action.variant}
                  className="text-sm sm:text-base px-3 sm:px-4 py-2"
                >
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
