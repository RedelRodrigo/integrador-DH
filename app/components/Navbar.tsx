import Image from "next/image";

const ButtonTransparent = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-transparent border border-[#C1FD35] px-4 py-2 rounded text-[#C1FD35] hover:bg-[#C1FD35] hover:text-black transition-colors duration-300 cursor-pointer">
      {children}
    </button>
  );
};

const ButtonGeneral = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-[#C1FD35] text-black px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300 cursor-pointer">
      {children}
    </button>
  );
};

export const Navbar = () => {
  return (
    <div className="bg-[#201F22] flex items-center justify-between w-full h-16">
      <div className="container mx-auto px-4 py-3">
        <Image
          src="/logo01.svg"
          alt="Logo"
          width={87}
          height={33}
          loading="eager"
        />
      </div>
      <div className=" mx-auto px-4 py-3 flex space-x-4 ">
        <ButtonTransparent>Ingresar</ButtonTransparent>
        <ButtonGeneral>Crear cuenta</ButtonGeneral>
      </div>
    </div>
  );
};
