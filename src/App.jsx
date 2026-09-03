import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume/Resume';
import HumanVerificationGate from './components/BotShield/HumanVerificationGate';

function App() {
  return (
    <HumanVerificationGate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-projects" element={<Home />} />
        <Route path="/client-work" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/experience" element={<Home />} />
        <Route path="/skills" element={<Home />} />
        <Route path="/certifications" element={<Home />} />
        <Route path="/academics" element={<Home />} />
        <Route path="/internships" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </HumanVerificationGate>
  );
}

export default App;
