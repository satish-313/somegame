import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/component/nav";
import Footer from "@/component/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Funatics Stat",
    description: "Funatics game stat",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="max-w-5xl mx-auto w-11/12 min-h-screen">                 <Nav />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
