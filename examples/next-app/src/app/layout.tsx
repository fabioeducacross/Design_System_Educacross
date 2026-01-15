import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Educacross Design System - Exemplo Next.js",
  description: "Exemplo de uso do @educacross/ui com Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
