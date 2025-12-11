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
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans min-h-screen`} suppressHydrationWarning={true}>
        <TopBanner />
        <Navbar />
        <main className="flex-1" style={{ paddingTop: 'calc(var(--topbanner-height, 0px) + 64px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
