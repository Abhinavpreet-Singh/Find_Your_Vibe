import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

// Import components
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import HackathonTeam from '../components/sections/HackathonTeam';
import Music from '../components/sections/Music';
import Hobbies from '../components/sections/Hobbies';
import Team from '../components/sections/Team';
import FAQ from '../components/sections/FAQ';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import Footer from '../components/Footer';

const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun className="text-primary-gold" /> : <FiMoon className="text-primary-purple" />}
        </button>
      </div>
      
      <Navbar />
      <Hero />
      <Stats />
      <HackathonTeam />
      <Music />
      <Hobbies />
      <Team />
      <FAQ />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;