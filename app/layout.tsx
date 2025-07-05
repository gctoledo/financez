import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "sonner";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Financez",
  description: "Gerenciador de finanças pessoais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ClerkProvider appearance={{ baseTheme: dark }} localization={ptBR}>
        <body className={`${mulish.className} antialiased`}>
          <div className="flex-col lg:flex lg:h-full lg:overflow-hidden">
            {children}
          </div>

          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
