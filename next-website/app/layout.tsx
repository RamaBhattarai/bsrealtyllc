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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans`} suppressHydrationWarning={true}>
        <Navbar />
        <main className="p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
