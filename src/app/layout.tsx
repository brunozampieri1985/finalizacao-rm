import type { Metadata } from "next";
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
  title: "Not found",
  description:
    "Not found",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          inter.className,
          "flex flex-col p-2 md:p-0 md:px-48 min-h-full"
        )}
      >
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
