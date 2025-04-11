import type { Metadata } from "next";
import "../globals.css";
import Nav from "../components/nav";
import Footer from "../components/footer";
import ScrollToTop from "../components/scrollToTop";


export const metadata: Metadata = {
  title: "Stedan Ampofo",
  description:
    "The portfolio of Stedan Ampofo – Frontend Developer, UI/UX Enthusiast, and Tech Innovator. Showcasing projects, skills, and a journey in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
         className={`antialiased`}
  style={{ fontFamily: "var(--font-genty)" }}
      >
        <Nav />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
