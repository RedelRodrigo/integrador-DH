import { Navbar, Footer } from "../components";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/chica.svg')",
        backgroundPosition: "center top",
      }}
    >
      <Navbar />
      <div className="flex-1 overflow-y-auto flex">{children}</div>
      <Footer />
    </div>
  );
}
