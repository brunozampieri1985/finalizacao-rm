import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import { cn } from "@/lib/utils";
import { MarmoreProvider } from "@/providers/marmore";
import { AppBar } from "@/components/shared/appbar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "R&M Planejados - Central de Projetos",
  description:
    "Central de Projetos para rápida consulta e utilização dos funcionários da R&M Planejados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className, " p-2 md:p-0 md:px-48")}>
        <Toaster />
        <MarmoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AppBar />
            <Separator />
            {children}
          </ThemeProvider>
        </MarmoreProvider>
      </body>
    </html>
  );
}
