"use client";
import { HomeHero } from "../components/homeHero";
import TechExpertise from "../components/techExpertise";
import HomeServices from "../components/homeServices";
import FeaturedProjects from "../components/featuredProjects";
export default function Home() {
  return (
    <div>
      <HomeHero />
        <div className="px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)]">
        <TechExpertise />
        <HomeServices />
        <FeaturedProjects />
        </div>
    </div>  
  );
}
  