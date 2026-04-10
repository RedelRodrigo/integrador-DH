import { Navbar, Footer } from "../../components";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar actions={[]} variant="primary" logoSrc="/logodark.svg" />
      <main className="flex-1 flex items-center justify-center bg-dark px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
