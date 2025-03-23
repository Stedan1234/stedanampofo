"use client";
import { HomeHero } from "../components/homeHero";
import Nav from "../components/nav";
import Footer from "../components/footer";
import ScrollToTop from "../components/scrollToTop";
export default function Home() {
  return (
    <div>
      <Nav />
      <HomeHero />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
  