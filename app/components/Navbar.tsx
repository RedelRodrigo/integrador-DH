import Image from "next/image";
import { Button } from "./Button";

export const Navbar = () => {
  return (
    <nav className="bg-dark flex items-center justify-between w-full h-16">
      <div className="container mx-auto px-4 py-3">
        <Image
          src="/logo01.svg"
          alt="Digital Money House logo"
          width={87}
          height={33}
          loading="eager"
        />
      </div>
      <div className="mx-auto px-4 py-3 flex space-x-4">
        <Button variant="outline">Ingresar</Button>
        <Button variant="primary">Crear cuenta</Button>
      </div>
    </nav>
  );
};
