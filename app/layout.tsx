import "./globals.css";
import { Lato, Arvo } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arvo",
});
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans min-h-screen flex flex-col`} suppressHydrationWarning={true}>
        <Navbar />
        <main className="flex-1 p-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
