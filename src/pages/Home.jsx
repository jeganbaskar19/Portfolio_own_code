import { lazy, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Internships from '../components/Internships/Internships';
import Academics from '../components/Academics/Academics';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import ClientProjects from '../components/ClientProjects/ClientProjects';
import Certifications from '../components/Certifications/Certifications';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const AIAssistant = lazy(() => import('../components/AIAssistant/AIAssistant'));

const PATH_SECTION_MAP = {
  '/live-projects': 'client-projects',
  '/client-work': 'client-projects',
  '/contact': 'contact',
  '/projects': 'projects',
  '/about': 'about',
  '/experience': 'experience',
  '/skills': 'skills',
  '/certifications': 'certifications',
  '/academics': 'academics',
  '/internships': 'internships'
};

function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = PATH_SECTION_MAP[location.pathname];
    if (sectionId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const navOffset = 70;
          const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetTop = Math.max(0, elementTop - navOffset);
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Internships />
        <Academics />
        <Skills />
        <Projects />
        <ClientProjects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </>
  );
}

export default Home;
