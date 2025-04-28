import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiArrowRight, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';

// Add activeSection state and IntersectionObserver to track the current section
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext);
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
  // Set up IntersectionObserver to detect which section is in view
  useEffect(() => {
    if (isHomePage) {
      const sections = ['hero', 'stats', 'hobbies', 'activities', 'testimonials', 'faq'];
      
      const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -20% 0px', // Adjust margins to better detect when sections are in view
        threshold: 0.2, // Element is considered visible when 20% is in view
      };
      
      const observerCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };
      
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      
      // Observe each section
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
      
      return () => {
        // Clean up observer on unmount
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }
  }, [isHomePage, setActiveSection]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeItem && !event.target.closest('.nav-dropdown')) {
        setActiveItem(null);
      }
      if (userMenuOpen && !event.target.closest('.user-menu-dropdown')) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeItem, userMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Smooth scroll function - only works on home page
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    // Only perform smooth scroll on home page
    if (isHomePage) {
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // If clicking "Home", scroll to top with smooth behavior
        if (targetId === '#hero') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          // For other sections, scroll to the element with offset for navbar
          const offset = 80; // Navbar height plus some padding
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Navigate to home page with the target section as hash
      window.location.href = '/' + targetId;
    }
  };

  // Function to create appropriate link based on current page
  const createNavLink = (targetId, label, onClick) => {
    // If we're on the home page, use anchor with smooth scroll
    if (isHomePage) {
      return (
        <a
          href={targetId}
          onClick={onClick}
          className="px-4 py-2 text-gray-800 font-medium rounded-full flex items-center"
        >
          {label}
        </a>
      );
    } 
    // If on other pages, use Link to navigate to home page with hash
    else {
      return (
        <Link
          to={'/' + targetId}
          className="px-4 py-2 text-gray-800 font-medium rounded-full flex items-center"
        >
          {label}
        </Link>
      );
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 ${
          isScrolled ? 'py-2' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Dynamic container with gradient border */}
          <div className="relative">
            {/* Animated gradient border - appears only when scrolled */}
            {isScrolled && (
              <motion.div 
                className="absolute -inset-[3px] rounded-full z-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                  backgroundSize: "300% 100%",
                  backgroundPosition: "0% 0%",
                  animation: "gradientMove 8s linear infinite",
                }}
              />
            )}
            
            {/* Background - changes with scroll */}
            <div 
              className={`relative z-10 transition-all duration-500 ${
                isScrolled 
                  ? "bg-white rounded-full shadow-md" 
                  : "bg-white rounded-full shadow-sm"
              }`}
            >
              <nav>
                <div className="flex items-center justify-between h-16 px-6">
                  {/* Logo */}
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isHomePage ? (
                      <a 
                        href="#hero" 
                        onClick={(e) => handleSmoothScroll(e, "#hero")}
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold text-xl shadow-md">
                            <motion.div 
                              animate={{ 
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              FYV
                            </motion.div>
                          </div>
                          <div className="ml-2">
                            <div className="text-lg font-bold text-gray-800">
                              Find Your <span className="text-[#be70a9]">Vibe</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <Link to="/">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold text-xl shadow-md">
                            <motion.div 
                              animate={{ 
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              FYV
                            </motion.div>
                          </div>
                          <div className="ml-2">
                            <div className="text-lg font-bold text-gray-800">
                              Find Your <span className="text-[#be70a9]">Vibe</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                  
                  {/* Desktop Navigation - Updated with your current sections */}
                  <div className="hidden md:flex items-center space-x-1">
                    <NavItem 
                      href="#hero" 
                      label="Home" 
                      onClick={(e) => handleSmoothScroll(e, "#hero")} 
                      isHomePage={isHomePage}
                    />
                    
                    <NavItem 
                      href="#stats" 
                      label="Stats" 
                      onClick={(e) => handleSmoothScroll(e, "#stats")} 
                      isHomePage={isHomePage}
                    />
                    
                    <NavDropdown 
                      label="Discover" 
                      items={[
                        { 
                          label: "Hobbies", 
                          href: "#hobbies", 
                          onClick: (e) => handleSmoothScroll(e, "#hobbies") 
                        },
                        { 
                          label: "Activities", 
                          href: "#activities", 
                          onClick: (e) => handleSmoothScroll(e, "#activities") 
                        },
                      ]} 
                      isHomePage={isHomePage}
                    />
                    
                    <NavItem 
                      href="#testimonials" 
                      label="Testimonials" 
                      onClick={(e) => handleSmoothScroll(e, "#testimonials")} 
                      isHomePage={isHomePage}
                    />
                    
                    <NavItem 
                      href="#faq" 
                      label="FAQ" 
                      onClick={(e) => handleSmoothScroll(e, "#faq")} 
                      isHomePage={isHomePage}
                    />
                  </div>
                  
                  {/* Auth Buttons */}
                  <div className="hidden md:flex items-center space-x-3">
                    {currentUser ? (
                      <div className="relative user-menu-dropdown">
                        <motion.button
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                          className="flex items-center p-1 rounded-full border border-[#a477ab] text-[#a477ab] font-medium hover:bg-[#a477ab]/5 transition-colors"
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-[#a477ab]/30">
                            {currentUser.photoURL ? (
                              <img 
                                src={currentUser.photoURL} 
                                alt="Profile" 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold">
                                {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                            )}
                          </div>
                          {/* Added username display */}
                          <span className="mx-2 font-medium text-gray-700">
                            {currentUser.customDisplayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                          </span>
                          <motion.div
                            animate={{ rotate: userMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronDown />
                          </motion.div>
                        </motion.button>
                        
                        <AnimatePresence>
                          {userMenuOpen && (
                            <motion.div
                              className="absolute right-0 mt-2 w-48 z-10"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="relative">
                                <motion.div 
                                  className="absolute -inset-[3px] rounded-xl z-0 overflow-hidden"
                                  animate={{
                                    backgroundPosition: ["0% 0%", "200% 200%"],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 8,
                                    ease: "linear"
                                  }}
                                  style={{
                                    background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                                    backgroundSize: "300% 100%",
                                  }}
                                />
                                
                                <div className="relative bg-white rounded-xl shadow-lg py-2 z-10">
                                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5">
                                    Dashboard
                                  </Link>
                                  <Link to="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5">
                                    Profile Settings
                                  </Link>
                                  <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 flex items-center"
                                  >
                                    <FiLogOut className="mr-2" /> Log out
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <>
                        {location.pathname !== '/login' ? (
                          <Link to="/login">
                            <motion.button
                              className="px-5 py-2 rounded-full border border-[#a477ab] text-[#a477ab] font-medium hover:bg-[#a477ab]/5 transition-colors"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Log in
                            </motion.button>
                          </Link>
                        ) : (
                          <div className="relative">
                            <motion.button
                              className="relative px-5 py-2 rounded-full font-medium shadow-sm z-10 overflow-hidden"
                              style={{
                                background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c)",
                                backgroundSize: "300% 100%",
                                color: "white"
                              }}
                              animate={{
                                backgroundPosition: ["0% 0%", "200% 0%"],
                              }}
                              transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 5,
                                ease: "linear"
                              }}
                            >
                              Log in
                            </motion.button>
                          </div>
                        )}

                        {location.pathname !== '/signup' ? (
                          <motion.div className="relative">
                            {/* Gradient border button */}
                            <motion.div 
                              className="absolute -inset-[1.5px] rounded-full z-0 overflow-hidden"
                              animate={{
                                backgroundPosition: ["0% 0%", "200% 200%"],
                              }}
                              transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 8,
                                ease: "linear"
                              }}
                              style={{
                                background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                                backgroundSize: "300% 100%",
                              }}
                            />
                            <Link to="/signup">
                              <motion.button
                                className="relative px-5 py-2 rounded-full bg-white text-[#be70a9] font-medium shadow-sm z-10"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                <span className="flex items-center">
                                  Sign up
                                  <motion.div
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: Infinity,
                                      repeatType: "loop",
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <FiArrowRight className="ml-1.5" />
                                  </motion.div>
                                </span>
                              </motion.button>
                            </Link>
                          </motion.div>
                        ) : (
                          <div className="relative">
                            <motion.button
                              className="relative px-5 py-2 rounded-full font-medium shadow-sm z-10 overflow-hidden"
                              style={{
                                background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c)",
                                backgroundSize: "300% 100%",
                                color: "white"
                              }}
                              animate={{
                                backgroundPosition: ["0% 0%", "200% 0%"],
                              }}
                              transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 5,
                                ease: "linear"
                              }}
                            >
                              <span className="flex items-center">
                                Sign up
                                <FiArrowRight className="ml-1.5" />
                              </span>
                            </motion.button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Mobile Menu Button */}
                  <div className="md:hidden">
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className={`p-2 rounded-full ${
                        isMobileMenuOpen ? 'bg-[#a477ab]/10' : isScrolled ? 'bg-gray-50' : 'bg-white'
                      } border border-gray-100`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </motion.button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu - Updated with your current sections */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-24 px-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* White backdrop */}
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              exit={{ opacity: 0 }}
            />
            
            <div className="relative z-10 max-w-lg mx-auto">
              <div className="relative">
                {/* Menu container with gradient border */}
                <motion.div 
                  className="absolute -inset-[3px] rounded-2xl z-0 overflow-hidden"
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 200%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 8,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                    backgroundSize: "300% 100%",
                  }}
                />
                
                <div className="relative bg-white rounded-2xl shadow-md overflow-hidden z-10">
                  <motion.div
                    className="p-6 space-y-1"
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                      },
                      closed: {}
                    }}
                  >
                    <SimpleMobileNavItem 
                      to={isHomePage ? "#hero" : "/"} 
                      label="Home" 
                      onClick={isHomePage ? (e) => handleSmoothScroll(e, "#hero") : null}
                    />
                    <SimpleMobileNavDropdown 
                      label="Discover" 
                      items={[
                        { 
                          label: "Hobbies", 
                          href: "#hobbies", 
                          onClick: (e) => handleSmoothScroll(e, "#hobbies")
                        },
                        { 
                          label: "Activities", 
                          href: "#activities", 
                          onClick: (e) => handleSmoothScroll(e, "#activities")
                        },
                      ]} 
                    />
                    <SimpleMobileNavItem 
                      href="#stats" 
                      label="Stats" 
                      onClick={(e) => handleSmoothScroll(e, "#stats")}
                    />
                    <SimpleMobileNavItem 
                      href="#testimonials" 
                      label="Testimonials" 
                      onClick={(e) => handleSmoothScroll(e, "#testimonials")}
                    />
                    <SimpleMobileNavItem 
                      href="#faq" 
                      label="FAQ" 
                      onClick={(e) => handleSmoothScroll(e, "#faq")}
                    />
                    
                    <motion.div 
                      className="pt-6 space-y-3 border-t border-gray-100 mt-4"
                      variants={{
                        open: {
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.5 }
                        },
                        closed: {
                          opacity: 0,
                          y: 20
                        }
                      }}
                    >
                      {currentUser ? (
                        <>
                          <Link to="/dashboard">
                            <motion.button
                              className="w-full py-3 rounded-full border border-[#a477ab] text-[#a477ab] font-medium flex items-center justify-center"
                            >
                              <FiUser className="mr-2" /> Dashboard
                            </motion.button>
                          </Link>
                          <Link to="/dashboard/profile">
                            <motion.button
                              className="w-full py-3 rounded-full border border-[#a477ab] text-[#a477ab] font-medium flex items-center justify-center"
                            >
                              <div className="h-5 w-5 rounded-full overflow-hidden mr-2">
                                {currentUser.photoURL ? (
                                  <img 
                                    src={currentUser.photoURL} 
                                    alt="Profile" 
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold text-xs">
                                    {currentUser.customDisplayName?.charAt(0) || currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0)?.toUpperCase() || 'U'}
                                  </div>
                                )}
                              </div>
                              {currentUser.customDisplayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                            </motion.button>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium flex items-center justify-center"
                          >
                            <FiLogOut className="mr-2" /> Log out
                          </button>
                        </>
                      ) : (
                        <>
                          {location.pathname !== '/login' ? (
                            <Link to="/login">
                              <motion.button
                                className="w-full py-3 rounded-full border border-[#a477ab] text-[#a477ab] font-medium"
                              >
                                Log in
                              </motion.button>
                            </Link>
                          ) : (
                            <div className="relative">
                              <motion.button
                                className="relative w-full py-3 rounded-full font-medium shadow-sm z-10 overflow-hidden"
                                style={{
                                  background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c)",
                                  backgroundSize: "300% 100%",
                                  color: "white"
                                }}
                                animate={{
                                  backgroundPosition: ["0% 0%", "200% 0%"],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  duration: 5,
                                  ease: "linear"
                                }}
                              >
                                Log in
                              </motion.button>
                            </div>
                          )}
                          
                          {location.pathname !== '/signup' ? (
                            <div className="relative">
                              {/* Gradient border */}
                              <motion.div 
                                className="absolute -inset-[2px] rounded-full z-0 overflow-hidden"
                                animate={{
                                  backgroundPosition: ["0% 0%", "200% 200%"],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  duration: 8,
                                  ease: "linear"
                                }}
                                style={{
                                  background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                                  backgroundSize: "300% 100%",
                                }}
                              />
                              <Link to="/signup">
                                <motion.button
                                  className="relative w-full py-3 rounded-full bg-white text-[#be70a9] font-medium shadow-sm z-10"
                                >
                                  <span className="flex items-center">
                                    Sign up
                                    <FiArrowRight className="ml-1.5" />
                                  </span>
                                </motion.button>
                              </Link>
                            </div>
                          ) : (
                            <div className="relative">
                              <motion.button
                                className="relative w-full py-3 rounded-full font-medium shadow-sm z-10 overflow-hidden"
                                style={{
                                  background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c)",
                                  backgroundSize: "300% 100%",
                                  color: "white"
                                }}
                                animate={{
                                  backgroundPosition: ["0% 0%", "200% 0%"],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  duration: 5,
                                  ease: "linear"
                                }}
                              >
                                <span className="flex items-center">
                                  Sign up
                                  <FiArrowRight className="ml-1.5" />
                                </span>
                              </motion.button>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CSS keyframes for gradient animation */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

// Desktop Nav Item with background hover effect instead of underline
const NavItem = ({ href, label, onClick, isHomePage }) => {
  const location = useLocation();
  const { activeSection } = useContext(ActiveSectionContext);
  
  // Check if active based on section ID
  const isActive = () => {
    // Extract section ID from href (remove the #)
    const sectionId = href.replace('#', '');
    
    // If on homepage, check against active section
    if (location.pathname === '/' || location.pathname === '') {
      return activeSection === sectionId;
    }
    
    // For other pages/sections check pathname
    return href === "#login" && location.pathname === '/login' || 
           href === "#signup" && location.pathname === '/signup';
  };

  return (
    <div className="relative">
      {isHomePage ? (
        <a
          href={href}
          onClick={onClick}
          className={`px-4 py-2 font-medium rounded-full flex items-center transition-all duration-200 ${
            isActive() 
              ? 'text-[#be70a9] bg-[#be70a9]/10' 
              : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
          }`}
        >
          {label}
        </a>
      ) : (
        <Link
          to={'/' + href}
          state={{ scrollToSection: href }}
          className={`px-4 py-2 font-medium rounded-full flex items-center transition-all duration-200 ${
            isActive() 
              ? 'text-[#be70a9] bg-[#be70a9]/10' 
              : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
          }`}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

// Desktop Nav Dropdown with background hover effect
const NavDropdown = ({ label, items, isHomePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection } = useContext(ActiveSectionContext);
  
  // Check if this dropdown should be active (when hobbies or activities sections are active)
  const isActive = activeSection === 'hobbies' || activeSection === 'activities';
  
  return (
    <div 
      className="relative nav-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`px-4 py-2 font-medium rounded-full flex items-center transition-all duration-200
          ${isOpen || isActive ? 'text-[#be70a9] bg-[#be70a9]/10' : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'}`}
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="ml-1" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dropdown with thicker gradient border (3px) */}
            <div className="relative">
              <motion.div 
                className="absolute -inset-[3px] rounded-xl z-0 overflow-hidden"
                animate={{
                  backgroundPosition: ["0% 0%", "200% 200%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 8,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                  backgroundSize: "300% 100%",
                }}
              />
              
              <div className="relative bg-white rounded-xl shadow-lg py-2 z-10">
                {items.map((item, i) => (
                  <DropdownItem 
                    key={i} 
                    href={item.href} 
                    label={item.label} 
                    onClick={item.onClick} 
                    isHomePage={isHomePage}
                    isActive={activeSection === item.href.replace('#', '')}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dropdown item with background hover effect instead of underline
const DropdownItem = ({ href, label, onClick, isHomePage }) => {
  const location = useLocation();
  // Check if this dropdown item matches the current hash
  const isActive = location.hash === href;

  return (
    <div className="relative">
      {isHomePage ? (
        <a
          href={href}
          onClick={onClick}
          className={`block px-4 py-2 transition-all duration-200 ${
            isActive 
              ? 'text-[#be70a9] bg-[#be70a9]/10' 
              : 'text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5'
          }`}
        >
          {label}
        </a>
      ) : (
        <Link
          to={'/' + href}
          state={{ scrollToSection: href }}
          className={`block px-4 py-2 transition-all duration-200 ${
            isActive 
              ? 'text-[#be70a9] bg-[#be70a9]/10' 
              : 'text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5'
          }`}
        >
          {label}
        </Link>
      )}
    </div>
  );
};

// Simplified mobile nav item with active and hover styling
const SimpleMobileNavItem = ({ to, href, label, onClick }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
  // Check if this item is active
  const isActive = () => {
    if (location.hash) {
      return location.hash === (href || to);
    }
    
    if (isHomePage && (href === '#hero' || to === '#hero')) {
      return window.scrollY < 100;
    }
    
    return false;
  };
  
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 20 }
      }}
    >
      {isHomePage && onClick ? (
        <motion.a
          href={to || href}
          onClick={onClick}
          className={`block py-4 px-3 text-lg font-medium rounded-xl relative transition-all duration-200 ${
            isActive() 
              ? 'text-[#be70a9] bg-[#be70a9]/10' 
              : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
          }`}
        >
          {label}
        </motion.a>
      ) : (
        <Link
          to={to && typeof to === 'string' && to.startsWith ? 
            (to.startsWith('#') ? '/' + to : to) : '/'}

          state={{ scrollToSection: to && typeof to === 'string' && to.startsWith ? 
            (to.startsWith('#') ? to : null) : null }}
          className={`block py-4 px-3 text-lg font-medium rounded-xl relative transition-all duration-200 ${
            isActive() 
              ? 'text-[#be70a9] bg-[#be70a9]/10' 
              : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
          }`}
        >
          {label}
        </Link>
      )}
    </motion.div>
  );
};

// Simplified mobile nav dropdown with improved active and hover styling
const SimpleMobileNavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
  // Check if any dropdown items are active by comparing with current hash
  const hasActiveChild = items.some(item => location.hash === item.href);
  
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 20 }
      }}
    >
      <motion.button
        className={`flex items-center justify-between w-full py-4 px-3 text-lg font-medium rounded-xl transition-all duration-200 ${
          hasActiveChild || isOpen 
            ? 'text-[#be70a9] bg-[#be70a9]/10' 
            : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pl-6 pb-2 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, i) => {
              // Check if this dropdown item is active
              const isItemActive = location.hash === item.href;
              
              return (
                <div key={i}>
                  {isHomePage && item.onClick ? (
                    <motion.a
                      href={item.href}
                      onClick={item.onClick}
                      className={`block py-3 px-3 rounded-lg transition-all duration-200 ${
                        isItemActive 
                          ? 'text-[#be70a9] bg-[#be70a9]/10' 
                          : 'text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  ) : (
                    <Link
                      to={item.href && typeof item.href === 'string' && item.href.startsWith ? 
                        (item.href.startsWith('#') ? '/' + item.href : item.href) : '/'}

                      state={{ scrollToSection: item.href && typeof item.href === 'string' && item.href.startsWith ? 
                        (item.href.startsWith('#') ? item.href : null) : null }}
                      className={`block py-3 px-3 rounded-lg transition-all duration-200 ${
                        isItemActive 
                          ? 'text-[#be70a9] bg-[#be70a9]/10' 
                          : 'text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;