import { HeroSection } from "@/components/home/hero-section";
import { AboutPreview } from "@/components/home/about-preview";
import { SkillsPreview } from "@/components/home/skills-preview";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { ContactPreview } from "@/components/home/contact-preview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <SkillsPreview />
      <ProjectsPreview />
      <ContactPreview />
    </>
  );
}
