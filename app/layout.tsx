import "./globals.css";
<<<<<<< HEAD
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
=======
import Navbar from "./components/Navbar";
>>>>>>> 687ea3826827044a2f9a388371c67475543bb124

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className={`${lato.variable} font-sans min-h-screen flex flex-col`} suppressHydrationWarning={true}>
        <Navbar />
        <main className="flex-1 p-5">
          {children}
        </main>
        <Footer />
=======
      <body>
        <Navbar />
        <main className="p-5">
          {children}
        </main>
>>>>>>> 687ea3826827044a2f9a388371c67475543bb124
      </body>
    </html>
  );
}
