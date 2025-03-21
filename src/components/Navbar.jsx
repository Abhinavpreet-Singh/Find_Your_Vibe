import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Hackathons', href: '#hackathon' },
    { name: 'Music', href: '#music' },
    { name: 'Hobbies', href: '#hobbies' },
    { name: 'Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-10 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <motion.div
            className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-purple to-primary-red flex items-center justify-center text-white font-bold text-xl"
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            FYV
          </motion.div>
          <span className="ml-2 text-xl font-bold">
            Find Your <span className="gradient-text">Vibe</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-medium transition-colors hover:text-primary-purple dark:hover:text-primary-gold"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side - Theme Toggle & Login */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <FiSun className="text-primary-gold" /> : <FiMoon className="text-primary-purple" />}
          </motion.button>

          <motion.button
            className="hidden md:block px-4 py-2 rounded-full bg-gradient-to-r from-primary-purple to-primary-red text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login / Sign Up
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-dark-bg py-4 px-6 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="font-medium py-2 border-b border-gray-100 dark:border-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <motion.button
              className="py-2 px-4 rounded-full bg-gradient-to-r from-primary-purple to-primary-red text-white font-medium self-start"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login / Sign Up
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;