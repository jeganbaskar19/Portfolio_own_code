import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Internships from '../components/Internships/Internships';
import Academics from '../components/Academics/Academics';
import Projects from '../components/Projects/Projects';
import Certifications from '../components/Certifications/Certifications';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import AIAssistant from '../components/AIAssistant/AIAssistant';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Internships />
        <Academics />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}

export default Home;
