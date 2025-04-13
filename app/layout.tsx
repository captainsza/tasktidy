import type { Metadata } from "next";
import "./globals.css"; // Make sure this is first
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "TaskTidy - Organize Your Tasks",
  description: "A modern to-do list app to help you organize your tasks efficiently",
};

export const viewport = {
  themeColor: '#0a192f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
