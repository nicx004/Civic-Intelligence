import type { Metadata } from "next";
import Header from "@/components/layout/header";
import "../index.css";

export const metadata: Metadata = {
  title: "Civic Intelligence",
  description: "Citizen complaint intake for civic issue routing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
