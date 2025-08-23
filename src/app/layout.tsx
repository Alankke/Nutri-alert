import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriAlert - Salud Predictiva con Gamificación",
  description:
    "Aplicación web de salud pública predictiva con gamificación para orientación preventiva nutricional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <ClerkProvider>
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
