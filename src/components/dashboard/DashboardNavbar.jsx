import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut, FiHome, FiSettings, FiUsers, FiBriefcase, FiCalendar, FiBell, FiMoon, FiSun } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
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
      if (userMenuOpen && !event.target.closest('.user-menu-dropdown')) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Dashboard navigation items - update paths to reflect the folder structure
  const dashboardNavItems = [
    { path: '/dashboard/home', label: 'Home', icon: <FiHome className="mr-2" /> },
    { path: '/dashboard/connections', label: 'Vibes', icon: <FiUsers className="mr-2" /> },
    { path: '/dashboard/groups', label: 'Groups', icon: <FiBriefcase className="mr-2" /> },
    { path: '/dashboard/events', label: 'Events', icon: <FiCalendar className="mr-2" /> },
    { path: '/dashboard/notifications', label: 'Notifications', icon: <FiBell className="mr-2" /> },
  ];

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
            
            {/* Background - changes with scroll and theme */}
            <div 
              className={`relative z-10 transition-all duration-500 ${
                isScrolled 
                  ? isDarkMode 
                    ? "bg-gray-900 rounded-full shadow-md" 
                    : "bg-white rounded-full shadow-md"
                  : isDarkMode 
                    ? "bg-gray-900 rounded-full shadow-sm" 
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
                          <div className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            Find Your <span className="text-[#be70a9]">Vibe</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-1">
                    {dashboardNavItems.map((item, index) => (
                      <DashboardNavItem 
                        key={index}
                        to={item.path} 
                        label={item.label}
                        icon={item.icon}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </div>
                  
                  {/* User Menu and Theme Toggle */}
                  <div className="hidden md:flex items-center space-x-3">
                    {/* Theme Toggle Button */}
                    <motion.button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-full ${
                        isDarkMode 
                          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </motion.button>
                    
                    {/* User Menu Dropdown */}
                    <div className="relative user-menu-dropdown">
                      <motion.button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className={`flex items-center p-1 rounded-full border border-[#a477ab] ${
                          isDarkMode ? 'text-[#be70a9] hover:bg-gray-800' : 'text-[#a477ab] hover:bg-[#a477ab]/5'
                        } transition-colors`}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-[#a477ab]/30">
                          {currentUser?.photoURL ? (
                            <img 
                              src={currentUser.photoURL} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold">
                              {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          )}
                        </div>
                        {/* Added username display */}
                        <span className={`mx-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {currentUser?.customDisplayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                        </span>
                        <motion.div
                          animate={{ rotate: userMenuOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
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
                              
                              <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg py-2 z-10`}>
                                <Link to="/dashboard/profile" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-[#be70a9] hover:bg-gray-700' : 'text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5'}`}>
                                  Profile Settings
                                </Link>
                                <Link to="/dashboard" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-[#be70a9] hover:bg-gray-700' : 'text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5'}`}>
                                  Dashboard
                                </Link>
                                <button
                                  onClick={handleLogout}
                                  className={`w-full text-left px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700' : 'text-gray-700 hover:text-red-600 hover:bg-red-50'} flex items-center`}
                                >
                                  <FiLogOut className="mr-2" /> Log out
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Mobile Menu Button with Theme Toggle */}
                  <div className="md:hidden flex items-center space-x-2">
                    {/* Theme Toggle for Mobile */}
                    <motion.button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-full ${
                        isDarkMode 
                          ? 'bg-gray-800 text-yellow-400' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </motion.button>
                    
                    {/* Mobile Menu Toggle */}
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className={`p-2 rounded-full ${
                        isMobileMenuOpen 
                          ? isDarkMode ? 'bg-gray-800' : 'bg-[#a477ab]/10' 
                          : isDarkMode ? 'bg-gray-800' : isScrolled ? 'bg-gray-50' : 'bg-white'
                      } border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMobileMenuOpen 
                        ? <FiX size={22} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} /> 
                        : <FiMenu size={22} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
                      }
                    </motion.button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-24 px-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Theme-based backdrop */}
            <motion.div 
              className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
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
                
                <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-md overflow-hidden z-10`}>
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
                    {/* Add profile section to mobile menu */}
                    <motion.div
                      className={`flex items-center p-3 mb-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-[#a477ab]/5'}`}
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: -20 }
                      }}
                    >
                      <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#a477ab]/30">
                        {currentUser?.photoURL ? (
                          <img 
                            src={currentUser.photoURL} 
                            alt="Profile" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold text-xl">
                            {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {currentUser?.customDisplayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                        </div>
                        <Link to="/dashboard/profile" className="text-sm text-[#be70a9]">
                          View Profile
                        </Link>
                      </div>
                    </motion.div>
                    
                    {dashboardNavItems.map((item, index) => (
                      <MobileNavItem 
                        key={index}
                        to={item.path} 
                        label={item.label}
                        icon={item.icon}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                    
                    <motion.div 
                      className={`pt-6 space-y-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} mt-4`}
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
                      <button
                        onClick={handleLogout}
                        className={`w-full py-3 rounded-full ${
                          isDarkMode 
                            ? 'bg-red-900/30 text-red-400 border border-red-900/50' 
                            : 'bg-red-50 text-red-600 border border-red-200'
                        } font-medium flex items-center justify-center`}
                      >
                        <FiLogOut className="mr-2" /> Log out
                      </button>
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
      `}</style>
    </>
  );
};

// Dashboard Nav Item with hover effect but no underline
const DashboardNavItem = ({ to, label, icon, isDarkMode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 font-medium rounded-full flex items-center transition-all duration-200 ${
        isActive 
          ? 'text-[#be70a9] bg-[#be70a9]/10' 
          : isDarkMode
            ? 'text-gray-300 hover:bg-gray-800 hover:text-[#be70a9]'
            : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

// Mobile nav item
const MobileNavItem = ({ to, label, icon, isDarkMode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: 20 }
      }}
    >
      <Link
        to={to || '/'}
        className={`block py-4 px-3 text-lg font-medium rounded-xl flex items-center ${
          isActive 
            ? isDarkMode
              ? 'bg-gray-800 text-[#be70a9]'
              : 'bg-[#a477ab]/10 text-[#be70a9]' 
            : isDarkMode
              ? 'text-gray-300 hover:bg-gray-800 hover:text-[#be70a9]'
              : 'text-gray-800 hover:bg-[#a477ab]/5 hover:text-[#be70a9]'
        }`}
      >
        {icon}
        {label}
      </Link>
    </motion.div>
  );
};

export default DashboardNavbar;