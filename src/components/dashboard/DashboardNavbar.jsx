import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut, FiHome, FiSettings, FiUsers, FiBriefcase, FiCalendar, FiBell } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
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
    { path: '/dashboard/profile', label: 'Profile', icon: <FiUser className="mr-2" /> },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 ${
          isScrolled ? 'py-2 bg-white shadow-md' : 'py-3 bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav>
            <div className="flex items-center justify-between h-16 px-6">
              {/* Logo */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                // Fixed whileTap issue by properly setting the correct HTML element with motion
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
                      <div className="text-lg font-bold text-gray-800">
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
                  />
                ))}
              </div>
              
              {/* User Menu */}
              <div className="hidden md:flex items-center">
                <div className="relative user-menu-dropdown">
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#a477ab] text-[#a477ab] font-medium hover:bg-[#a477ab]/5 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    // Fixed whileTap issue by properly setting the correct HTML element with motion
                  >
                    <FiUser size={18} />
                    <span>{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}</span>
                    <motion.div
                      animate={{ rotate: userMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown className="ml-1" />
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
                            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5">
                              Profile Settings
                            </Link>
                            <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:text-[#be70a9] hover:bg-[#a477ab]/5">
                              Dashboard
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
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 rounded-full border border-gray-200`}
                  // Fixed whileTap issue by properly setting the correct HTML element with motion
                >
                  {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </motion.button>
              </div>
            </div>
          </nav>
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
                    {/* Fixed the startsWith error by adding proper null checks */}
                    {dashboardNavItems.map((item, index) => (
                      <MobileNavItem 
                        key={index}
                        to={item.path} 
                        label={item.label}
                        icon={item.icon}
                      />
                    ))}
                    
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
                      <button
                        onClick={handleLogout}
                        className="w-full py-3 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium flex items-center justify-center"
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
    </>
  );
};

// Dashboard Nav Item with animated gradient underline
const DashboardNavItem = ({ to, label, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={to}
        className={`px-4 py-2 font-medium rounded-full flex items-center ${
          isActive ? 'text-[#be70a9] bg-[#be70a9]/10' : 'text-gray-800'
        }`}
      >
        {icon}
        {label}
      </Link>
      
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

// Fixed mobile nav item with proper null checking for startsWith
const MobileNavItem = ({ to, label, icon }) => {
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
          isActive ? 'bg-[#a477ab]/10 text-[#be70a9]' : 'text-gray-800 hover:bg-[#a477ab]/5'
        }`}
      >
        {icon}
        {label}
      </Link>
    </motion.div>
  );
};

export default DashboardNavbar;