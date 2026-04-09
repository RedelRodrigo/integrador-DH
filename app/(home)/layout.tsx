import { Navbar, Footer } from "../components";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/chica.svg')",
        backgroundPosition: "center top",
      }}
    >
      <Navbar />
      <div className="flex-1 min-h-0">{children}</div>
      <Footer />
    </div>
  );
}
