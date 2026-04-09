import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Money House", // Cambiar esto
  description:
    "Tu nueva billetera virtual - Transferí y recibí dinero de forma segura",
  keywords: ["billetera digital", "transferencias", "dinero virtual"],
  authors: [{ name: "Digital Money House" }],
  openGraph: {
    title: "Digital Money House",
    description: "Tu nueva billetera virtual",
    url: "https://tudominio.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
