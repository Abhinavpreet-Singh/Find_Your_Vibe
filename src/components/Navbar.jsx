import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
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
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeItem]);

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
                  : "bg-transparent"
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
                      {location.pathname !== '/login' ? (
                        <Link to="/login">
                          <motion.button
                            className="w-full py-3 rounded-full border border-[#a477ab] text-[#a477ab] font-medium"
                            whileTap={{ scale: 0.97 }}
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
                              className="relative w-full py-3 rounded-full bg-white text-[#be70a9] font-medium z-10"
                              whileTap={{ scale: 0.97 }}
                            >
                              <span className="flex items-center justify-center">
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
                            <span className="flex items-center justify-center">
                              Sign up
                              <FiArrowRight className="ml-1.5" />
                            </span>
                          </motion.button>
                        </div>
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

// Desktop Nav Item with animated gradient underline
const NavItem = ({ href, label, onClick, isHomePage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = href === "#login" && location.pathname === '/login' || 
                   href === "#signup" && location.pathname === '/signup';

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHomePage ? (
        <a
          href={href}
          onClick={onClick}
          className={`px-4 py-2 font-medium rounded-full flex items-center ${isActive ? 'text-[#be70a9]' : 'text-gray-800'}`}
        >
          {label}
        </a>
      ) : (
        <Link
          to={'/' + href}
          state={{ scrollToSection: href }}
          className={`px-4 py-2 font-medium rounded-full flex items-center ${isActive ? 'text-[#be70a9]' : 'text-gray-800'}`}
        >
          {label}
        </Link>
      )}
      
      {/* Animated Gradient Underline */}
      <div className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered || isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="w-full h-full"
            style={{
              background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
              backgroundSize: "300% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 3,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Desktop Nav with animated gradient underline
const NavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative nav-dropdown"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsOpen(false);
      }}
    >
      <button
        className="px-4 py-2 text-gray-800 font-medium rounded-full flex items-center relative"
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="ml-1" />
        </motion.div>
      </button>
      
      {/* Animated Gradient Underline */}
      <div className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="w-full h-full"
            style={{
              background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
              backgroundSize: "300% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 3,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
      
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
                  <DropdownItem key={i} href={item.href} label={item.label} onClick={item.onClick} isHomePage={isHomePage} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const DropdownItem = ({ href, label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHomePage ? (
        <a
          href={href}
          onClick={onClick}
          className="block px-4 py-2 text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5"
        >
          {label}
        </a>
      ) : (
        <Link
          to={'/' + href}
          state={{ scrollToSection: href }}
          className="block px-4 py-2 text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5"
        >
          {label}
        </Link>
      )}
      
      {/* Animated Gradient Underline */}
      <div className="absolute bottom-0.5 left-4 right-4 h-[1px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="w-full h-full"
            style={{
              background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
              backgroundSize: "300% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 3,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Simplified mobile nav item 
const SimpleMobileNavItem = ({ to, label, onClick }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 20 }
      }}
    >
      {isHomePage && onClick ? (
        <a
          href={to}
          onClick={onClick}
          className="block py-4 px-3 text-lg font-medium text-gray-800 rounded-xl hover:bg-[#a477ab]/5 relative"
        >
          {label}
        </a>
      ) : (
        <Link
          to={to.startsWith('#') ? '/' + to : to}
          state={{ scrollToSection: to.startsWith('#') ? to : null }}
          className="block py-4 px-3 text-lg font-medium text-gray-800 rounded-xl hover:bg-[#a477ab]/5 relative"
        >
          {label}
        </Link>
      )}
    </motion.div>
  );
};

// Simplified mobile nav dropdown without underline animations
const SimpleMobileNavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 20 }
      }}
    >
      <button
        className="flex items-center justify-between w-full py-4 px-3 text-lg font-medium text-gray-800 rounded-xl hover:bg-[#a477ab]/5"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pl-6 pb-2 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, i) => (
              <div key={i}>
                {isHomePage && item.onClick ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className="block py-3 px-3 rounded-lg hover:bg-[#a477ab]/5 text-gray-700"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href.startsWith('#') ? '/' + item.href : item.href}
                    state={{ scrollToSection: item.href }}
                    className="block py-3 px-3 rounded-lg hover:bg-[#a477ab]/5 text-gray-700"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;