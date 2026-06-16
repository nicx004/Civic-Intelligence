import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
