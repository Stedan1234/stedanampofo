"use client";
import { HomeHero } from "../components/homeHero";
import Nav from "../components/nav";
import Footer from "../components/footer";
import ScrollToTop from "../components/scrollToTop";
import TechExpertise from "../components/techExpertise";
export default function Home() {
  return (
    <div>
      <Nav />
      <HomeHero />
        <div className="px-4 lg:px-20">
      <TechExpertise />
      <Footer />
        <ScrollToTop />
        </div>
    </div>
  );
}
  