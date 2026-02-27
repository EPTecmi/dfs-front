import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DFS - Proyecto Full Stack",
  description: "Proyecto de desarrollo full stack utilizando Next.js, Tailwind CSS. Este proyecto incluye funcionalidades de autenticación, gestión de productos y una interfaz de usuario moderna y responsiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4`}
      >
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
