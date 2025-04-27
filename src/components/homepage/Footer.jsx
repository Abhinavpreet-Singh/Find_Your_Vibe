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
    <footer className="bg-white pt-24 pb-12 px-4 md:px-6 lg:px-10 relative overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="100"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-gray-50"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
      
      {/* Background color blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
            
            <p className="text-gray-600 mb-8 pr-4 text-lg">
              Connect with like-minded individuals who share your passions.
              From hackathons to music jams to gaming nights – find your people.
            </p>
          </motion.div>
          
          {/* Footer Links */}
          {footerLinks.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="font-bold text-lg mb-5 text-gray-800">{category.title}</h3>
              <ul className="space-y-3">
                {category.links.map((link, i) => (
                  <li key={i}>
                    <motion.a 
                      href={link.href}
                      className="text-gray-600 hover:text-[#be70a9] transition-colors inline-block"
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
            <h3 className="font-bold text-lg mb-5 text-gray-800">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-14 w-14 rounded-lg bg-white shadow-md flex items-center justify-center text-gray-600 border border-gray-100 hover:border-0"
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
              <p className="text-gray-600">
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
            <div className="relative m-[2px] p-8 bg-white rounded-2xl z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="sm:w-2/5">
                  <motion.div 
                    className="inline-block px-4 py-1.5 rounded-full bg-[#be70a9] bg-opacity-10 text-[#be70a9] text-sm font-medium mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Find Your Tribe
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">
                    Get the latest <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#be70a9] to-[#c36376]">updates & events</span>
                  </h3>
                  <p className="text-gray-600">
                    Stay connected with our community. We send weekly digests of new activities and events matching your interests.
                  </p>
                </div>
                <div className="sm:w-3/5">
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className={`w-full px-5 py-3.5 rounded-lg bg-white border ${
                        subscriptionStatus === 'error' ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-[#a477ab]'
                      } focus:outline-none focus:ring-2 text-gray-800`}
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
                        className="relative w-full px-5 py-3.5 bg-white text-[#a477ab] font-medium rounded-lg shadow-md flex items-center justify-center z-10"
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
                      <motion.p 
                        className="text-green-600 text-xs mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Thanks for subscribing! Get ready for good vibes in your inbox.
                      </motion.p>
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
        <div className="border-t border-gray-200 mb-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            © {currentYear} Find Your Vibe. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-gray-600 hover:text-[#be70a9]">Privacy</a>
            <a href="/terms" className="text-sm text-gray-600 hover:text-[#be70a9]">Terms</a>
            <a href="/cookies" className="text-sm text-gray-600 hover:text-[#be70a9]">Cookies</a>
            <motion.div 
              className="text-sm text-gray-600 flex items-center"
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