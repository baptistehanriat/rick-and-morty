import { ClientApolloProvider } from "@/graphql/ClientApolloProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty universe",
  description: "Discover Rick and Morty universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientApolloProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClientApolloProvider>
  );
}
