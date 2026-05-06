import { Navbar, Footer } from "../components";
import { getBackgroundImage } from "@/lib/services";

// Desactivar cache para que siempre intente conectar a la BD
export const revalidate = 0;

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgImage = await getBackgroundImage();

  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundPosition: "center top",
      }}
    >
      <Navbar />
      <div className="flex-1 overflow-y-auto flex">{children}</div>
      <Footer />
    </div>
  );
}
