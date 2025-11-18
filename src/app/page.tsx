"Use Client"
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"
import EducationSection from "./components/EducationSection"
import SkillsSection from "./components/SkillsSection"
import ProjectsSection from "./components/ProjectsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import SectionDivider from "@/components/ui/SectionDivider"

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <SectionDivider/>
      <EducationSection/>
      <SectionDivider/>
      <SkillsSection/>
      <SectionDivider/>
      <ProjectsSection/>
      <SectionDivider/>
      <ContactSection/>
      <Footer/>
    </main>
  );
}


