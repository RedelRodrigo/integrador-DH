import { Navbar, Footer } from "../../components";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar actions={[]} variant="primary" logoSrc="/logodark.svg" />
      <main className="flex-1 overflow-y-auto flex items-center justify-center bg-dark px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
