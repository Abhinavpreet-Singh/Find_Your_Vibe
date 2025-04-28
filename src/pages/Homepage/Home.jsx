import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { ActiveSectionProvider } from '../../context/ActiveSectionContext';

// Import components
import Navbar from '../../components/homepage/Navbar';
import Hero from '../../components/homepage/Hero';
import Stats from '../../components/homepage/Stats';
import Hobbies from '../../components/homepage/Hobbies';
import FAQ from '../../components/homepage/FAQ';
import Testimonials from '../../components/homepage/Testimonials';
import CTA from '../../components/homepage/CTA';
import Footer from '../../components/homepage/Footer';
import Activities from '../../components/homepage/Activities';

const Home = () => {
  // Keep the useTheme hook for compatibility, but we won't use the toggle function
  const { isDarkMode } = useTheme();
  const location = useLocation();
  
  // Handle scrolling to sections when redirected from other pages
  useEffect(() => {
    // Check if we have a section to scroll to in location state
    if (location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      const element = document.querySelector(sectionId);
      
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          const offset = 80; // Navbar height plus some padding
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    // Wrap the entire component with the ActiveSectionProvider
    <ActiveSectionProvider>
      <div className={`min-h-screen bg-white ${isDarkMode ? 'dark' : ''}`}>
        {/* Removed theme toggle button */}
        
        <Navbar />
        <Hero id="hero" />
        <Stats id="stats" />
        <Hobbies id="hobbies" />
        <Activities id="activities" />
        <Testimonials id="testimonials" />
        <CTA id="cta" />
        <FAQ id="faq" />
        <Footer />
      </div>
    </ActiveSectionProvider>
  );
};

export default Home;