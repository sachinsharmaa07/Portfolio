import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import CertificatesSection from './components/CertificatesSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';


export default function App() {
  return (
    <div style={{ background: 'var(--color-void)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <CertificatesSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
   
    </div>
  );
}
