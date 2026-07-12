import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GenLabs",
  description:
    "A student-led platform where BCA students find collaborators, get mentored, and launch real projects publicly.",
    icons: {
      icon: "GenLabs_WhiteLogo.png",
    }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-paper text-ink min-h-[100dvh] flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
