import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiArrowRight, FiHeart, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

// Custom X logo component (Twitter rebrand)
const XLogo = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
  </svg>
);

// Confetti component for success animation
const Confetti = ({ colors }) => {
  const confettiItems = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -20 - Math.random() * 80,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? 'circle' : 'rect'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {confettiItems.map(item => (
        <motion.div
          key={item.id}
          className={`absolute ${item.shape === 'circle' ? 'rounded-full' : ''}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.shape === 'circle' ? '8px' : '12px',
            height: item.shape === 'circle' ? '8px' : '6px',
            backgroundColor: item.color,
            transformOrigin: 'center'
          }}
          animate={{
            y: ['0%', '120%'],
            x: [`${item.x}%`, `${item.x + (Math.random() * 20 - 10)}%`],
            rotate: [0, item.rotation],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// SuccessMessage component with envelope animation
const SuccessMessage = () => {
  return (
    <motion.div 
      className="relative mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-[#a477ab]/10 via-[#c36376]/10 to-[#edb04c]/10 rounded-xl p-4 relative overflow-hidden">
        {/* Animated envelope */}
        <div className="flex items-center mb-3">
          <motion.div 
            className="relative mr-3 flex-shrink-0"
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ 
              scale: 1, 
              rotate: [0, 5, 0, -5, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              scale: { duration: 0.4 },
              rotate: { repeat: Infinity, duration: 4 },
              y: { repeat: Infinity, duration: 2 }
            }}
          >
            <motion.div 
              className="w-10 h-7 bg-gradient-to-r from-[#a477ab] to-[#c36376] rounded-md flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0px 4px 8px rgba(0,0,0,0.1)", 
                  "0px 8px 16px rgba(0,0,0,0.15)", 
                  "0px 4px 8px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            >
              <motion.div 
                className="w-8 h-5 bg-white rounded-sm flex items-center justify-center"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <motion.div 
                  className="flex items-center h-3 w-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div 
                    className="h-0.5 bg-[#c36376] flex-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-[#a477ab] mx-0.5"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                  />
                  <motion.div 
                    className="h-0.5 bg-[#c36376] flex-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Flying check marks */}
            <motion.div 
              className="absolute -right-1 -top-1 text-green-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <FiCheck size={16} />
            </motion.div>
            
            {/* Animated sparkles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#edb04c]"
                style={{ 
                  left: `${10 + i * 30}%`, 
                  top: i % 2 === 0 ? '-15px' : '15px',
                  fontSize: `${8 + i * 2}px`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  y: [0, i % 2 === 0 ? -15 : 15, 0]
                }}
                transition={{ 
                  delay: 1.2 + (i * 0.2),
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: i * 0.5
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
          
          <div>
            <motion.h4
              className="font-medium text-[#a477ab]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              You're all set!
            </motion.h4>
            <motion.p
              className="text-sm text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              We've added you to our newsletter
            </motion.p>
          </div>
        </div>
        
        {/* Message content */}
        <motion.div 
          className="text-sm text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p>Thanks for subscribing! Your first email will arrive soon with updates on events, activities, and connections that match your interests.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const newsletterContainerRef = useRef(null);
  
  // Your custom colors
  const colors = {
    lavender: "#be70a9",
    red: "#c36376",
    purple: "#a477ab",
    gold: "#edb04c"
  };
  
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard/home" },
        { name: "Profile", href: "/dashboard/profile" },
        { name: "Login", href: "/login" },
        { name: "Sign Up", href: "/signup" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Vibes", href: "/dashboard/connections" },
        { name: "Events", href: "/dashboard/events" },
        { name: "Sessions", href: "/dashboard/home" },
        { name: "Activities", href: "/#activities" },
        { name: "Hobbies", href: "/#hobbies" },
      ]
    },
  ];
  
  const socialLinks = [
    { 
      icon: <XLogo size={18} />, 
      href: "https://x.com/", 
      label: "X",
      color: colors.lavender
    },
    { 
      icon: <FiInstagram size={20} />, 
      href: "https://instagram.com/", 
      label: "Instagram",
      color: colors.red
    },
    { 
      icon: <FiGithub size={20} />, 
      href: "https://github.com/", 
      label: "GitHub",
      color: colors.purple
    },
    { 
      icon: <FiLinkedin size={20} />, 
      href: "https://linkedin.com/", 
      label: "LinkedIn",
      color: colors.gold
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Handle mouse movement for spotlight effect in newsletter section
  const handleMouseMove = (e) => {
    if (newsletterContainerRef.current) {
      const { left, top, width, height } = newsletterContainerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
    }
  };
  
  // Transform values for spotlight effect
  const spotlightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  // Button hover state
  const [buttonHovered, setButtonHovered] = useState(false);
  
  // Email subscription states
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Handle email submission
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setSubscriptionStatus('submitting');
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 5000);
    }, 800);
  };

  return (
    <footer className="bg-white dark:bg-black pt-24 pb-12 px-4 md:px-6 lg:px-10 relative overflow-hidden">
      {/* Background color blobs - Removed in dark mode */}
      <div className="absolute inset-0 z-0 overflow-hidden dark:hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#be70a9]/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-[#edb04c]/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#a477ab]/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Logo, Description and Links Section */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo and Description */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="mb-6">
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  FYV
                </div>
                <div className="ml-3">
                  <div className="text-2xl font-bold">
                    Find Your <span className="text-[#be70a9]">Vibe</span>
                  </div>
                  <div className="text-xs text-[#a477ab] font-medium">CONNECT • CREATE • COLLABORATE</div>
                </div>
              </motion.div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 pr-4 text-lg">
              Connect with like-minded individuals who share your passions.
              From hackathons to music jams to gaming nights – find your people.
            </p>
          </motion.div>
          
          {/* Footer Links */}
          {footerLinks.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="font-bold text-lg mb-5 text-gray-800 dark:text-gray-100">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link, i) => (
                  <li key={i}>
                    <motion.a 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#be70a9] dark:hover:text-[#be70a9] transition-colors inline-block"
                      whileHover={{ x: 3 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Social and Subscribe Section - Enhanced Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16 items-start">
          {/* Social Icons Column */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-5 text-gray-800 dark:text-gray-100">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-14 w-14 rounded-lg bg-white dark:bg-black shadow-md flex items-center justify-center text-black dark:text-white border border-gray-100 dark:border-gray-800 hover:border-0"
                  whileHover={{ 
                    y: -5,
                    backgroundColor: link.color,
                    color: "#ffffff",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-6">
              <p className="text-gray-600 dark:text-gray-300">
                Follow us for updates, announcements, and community highlights.
              </p>
            </div>
          </motion.div>
          
          {/* Subscribe Form Column - Enlarged */}
          <motion.div 
            ref={newsletterContainerRef}
            onMouseMove={handleMouseMove}
            className="lg:w-3/4 relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Moving gradient border */}
            <motion.div 
              className="absolute inset-0 rounded-2xl z-0"
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
            
            {/* Interactive spotlight effect */}
            <motion.div
              className="absolute w-[40vw] h-[40vw] rounded-full bg-white/5 blur-[50px] pointer-events-none z-0"
              style={{
                left: spotlightX,
                top: spotlightY,
                translateX: "-50%",
                translateY: "-50%"
              }}
            />
            
            {/* Content with 2px padding to show the gradient border */}
            <div className="relative m-[2px] p-8 bg-white dark:bg-black rounded-2xl z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="sm:w-2/5">

                  <h3 className="text-2xl font-bold mb-3 dark:text-white">
                    Get the latest <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#be70a9] to-[#c36376]">updates & events</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Stay connected with our community. We send weekly digests of new activities and events matching your interests.
                  </p>
                </div>
                <div className="sm:w-3/5">
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className={`w-full px-5 py-3.5 rounded-lg bg-white dark:bg-black border ${
                        subscriptionStatus === 'error' ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 dark:border-gray-700 focus:ring-[#a477ab]'
                      } focus:outline-none focus:ring-2 text-gray-800 dark:text-white`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={subscriptionStatus === 'submitting' || subscriptionStatus === 'success'}
                    />
                    
                    {/* Subscribe Button */}
                    <div className="relative">
                      {/* Moving gradient border */}
                      <motion.div 
                        className="absolute -inset-0.5 rounded-lg z-0 overflow-hidden"
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
                      
                      <motion.button
                        type="submit"
                        className="relative w-full px-5 py-3.5 bg-white dark:bg-black text-[#a477ab] font-medium rounded-lg shadow-md flex items-center justify-center z-10"
                        onHoverStart={() => setButtonHovered(true)}
                        onHoverEnd={() => setButtonHovered(false)}
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                        }}
                        whileTap={{ scale: 0.97 }}
                        disabled={subscriptionStatus === 'submitting' || subscriptionStatus === 'success'}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {subscriptionStatus === 'submitting' ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#a477ab]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : subscriptionStatus === 'success' ? (
                            <span className="flex items-center">
                              <FiCheck className="mr-2" size={20} />
                              Subscribed!
                            </span>
                          ) : (
                            <>
                              <span className="font-medium text-base">
                                Subscribe to Updates
                              </span>
                              <motion.div
                                animate={{ 
                                  x: buttonHovered ? 5 : 0,
                                  transition: { type: "spring", stiffness: 300 }
                                }}
                              >
                                <FiArrowRight size={20} />
                              </motion.div>
                            </>
                          )}
                        </div>
                      </motion.button>
                    </div>
                  </form>
                  
                  {/* Error message */}
                  {subscriptionStatus === 'error' && (
                    <p className="text-red-500 text-xs mt-2">
                      {errorMessage}
                    </p>
                  )}
                  
                  {/* Success message */}
                  <AnimatePresence>
                    {subscriptionStatus === 'success' && (
                      <>
                        <Confetti colors={[colors.lavender, colors.red, colors.purple, colors.gold]} />
                        <SuccessMessage />
                      </>
                    )}
                  </AnimatePresence>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Find Your Vibe. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#be70a9]">Privacy</a>
            <a href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#be70a9]">Terms</a>
            <a href="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#be70a9]">Cookies</a>
            <motion.div 
              className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              Made by team Find Your Vibe~~
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;