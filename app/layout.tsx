import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/header";
export const metadata: Metadata = { title: "ShelfLife — your reading shelf", description: "Keep track of the books you want to read, are reading, and have finished." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AuthProvider><Header />{children}</AuthProvider></body></html>; }
