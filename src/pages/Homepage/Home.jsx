import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';

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
        // Add a slight delay to ensure the page has fully rendered
        setTimeout(() => {
          const navbarOffset = 80; // Adjust based on navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    
    // Check for hash in URL for direct links
    if (location.hash) {
      const sectionId = location.hash;
      const element = document.querySelector(sectionId);
      
      if (element) {
        setTimeout(() => {
          const navbarOffset = 80; // Adjust based on navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
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
  );
};

export default Home;