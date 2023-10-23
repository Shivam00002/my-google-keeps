import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes Keeper",
  description: "Developed by Ankit Panchal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
