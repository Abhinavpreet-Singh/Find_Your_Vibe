import { useTheme } from '../context/ThemeContext';

// Import components
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Hobbies from '../components/sections/Hobbies';
import FAQ from '../components/sections/FAQ';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import Footer from '../components/Footer';
import Activities from '../components/sections/Activities';

const Home = () => {
  // Keep the useTheme hook for compatibility, but we won't use the toggle function
  const { isDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Removed theme toggle button */}
      
      <Navbar />
      <Hero />
      <Stats />
      <Hobbies />
      <Activities />
      <FAQ />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;