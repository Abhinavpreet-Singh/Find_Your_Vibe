import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import {Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(null);
  const orbitRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to handle navigation based on user login status
  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  // Function to scroll to hobbies section
  const scrollToHobbies = (e) => {
    e.preventDefault();
    const hobbiesSection = document.getElementById('hobbies');
    if (hobbiesSection) {
      hobbiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-20 md:pt-28 md:pb-28 px-4 overflow-hidden">
      {/* Enhanced background gradients with subtle animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-[#be70a9]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-60 left-0 w-[500px] h-[500px] rounded-full bg-[#edb04c]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.1, 0.14, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-40 w-[550px] h-[550px] rounded-full bg-[#c36376]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.03, 1],
            opacity: [0.1, 0.13, 0.1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 pr-0 md:pr-8">
        {/* Text Content - shifted right with padding */}
        <div className="md:ml-8">
          {/* Enhanced animated heading with better visual treatment - no background */}
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
              >
                <span className="relative z-10 text-gray-800 dark:text-gray-50 mr-3">Find</span>
                <span className="relative z-10 text-gray-800 dark:text-gray-50 mr-3">Your</span>
                <motion.span 
                  className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"
                  animate={{ 
                    backgroundPosition: ["0% center", "100% center", "0% center"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "300% 100%" }}
                >
                  Vibe
                </motion.span>
              </motion.h1>
              
              {/* Animated underline effect - width matches the full text */}
              <motion.div 
                className="h-2 md:h-3 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c] rounded-full mt-2"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              ></motion.div>
            </motion.div>
          </div>
          
          {/* Enhanced slogan with slide-in animation - italic with no background */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 italic relative z-10">
              Your Network is Your Net Worth
            </p>
          </motion.div>
          
          {/* Description paragraph with enhanced animation */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-8"
          >
            Connect with individuals who share your interests and passions.
            Discover like-minded communities and unlock new experiences
            through our vibrant platform.
          </motion.p>
          
          {/* Buttons with enhanced hover */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-6 items-center"
          >
            {/* Get Started Button with Enhanced Gradient Border & Hover */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Improved gradient border with faster animation */}
              <motion.div 
                className="absolute -inset-[2px] rounded-full z-0 overflow-hidden"
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
                  duration: 5, // Faster animation
                  ease: "linear"
                }}
              />
              
{/* Button content */}
              <button 
                className="relative px-7 py-4 rounded-full bg-white dark:bg-black shadow-md z-10 flex items-center gap-2 transition-all duration-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-900"
                onClick={handleGetStarted}
              >
                <span className="font-semibold text-lg text-[#a477ab]">
                  {currentUser ? "Go to Dashboard" : "Get Started Now"}
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <FiArrowRight className="text-[#c36376] text-lg" />
                </motion.div>
              </button>
            </motion.div>
            
            {/* Explore Link with enhanced hover */}
            <motion.a 
              href="#explore"
              className="text-[#a477ab] font-medium text-lg flex items-center gap-1 relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              onClick= {scrollToHobbies}
            >
              <span>Explore Interests</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
              
              {/* Animated underline on hover with gradient */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "linear-gradient(to right, #a477ab, #c36376, #edb04c)",
                }}
              />
            </motion.a>
          </motion.div>
        </div>
        
        {/* Enhanced Visual Content - Added mt-12 for mobile spacing */}
        <div className="relative h-[400px] md:h-[550px] md:mr-0 md:ml-8 mt-16 md:mt-0">
          <EnhancedFloatingIcons isLoaded={isLoaded} />
        </div>
      </div>
    </section>
  );
};

// Enhanced floating elements with interaction, particles, and 3D effects
const EnhancedFloatingIcons = ({ isLoaded }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const controls = useAnimation();
  
  // Define icons and themes with colors - extended with more data
  const icons = [
    { emoji: "💻", color: "#a477ab", animationDuration: 8, name: "Tech", description: "Connect with tech enthusiasts" },
    { emoji: "🎮", color: "#c36376", animationDuration: 10, name: "Gaming", description: "Find your gaming community" },
    { emoji: "🎸", color: "#edb04c", animationDuration: 9, name: "Music", description: "Share your musical passion" },
    { emoji: "📚", color: "#a477ab", animationDuration: 12, name: "Books", description: "Join book clubs and discussions" },
    { emoji: "🏋️", color: "#c36376", animationDuration: 11, name: "Fitness", description: "Workout partners and advice" },
    { emoji: "🎨", color: "#edb04c", animationDuration: 13, name: "Art", description: "Showcase your creativity" },
    { emoji: "🌱", color: "#a477ab", animationDuration: 9, name: "Nature", description: "Explore the outdoors together" },
    { emoji: "🍳", color: "#c36376", animationDuration: 10, name: "Cooking", description: "Share recipes and food tips" }
  ];

  // Check if window is defined (client-side rendering)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Particles configuration
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
    size: Math.random() * 3 + 1,
    color: icons[Math.floor(Math.random() * icons.length)].color
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center scale-90 md:scale-100 md:translate-x-6">
      {/* Enhanced central logo with subtle 3D effect */}
      <div className="absolute z-30">
        <motion.div 
          className="relative w-36 h-36 md:w-40 md:h-40 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-xl overflow-hidden"
          initial={{ scale: 0, rotateY: 0 }}
          animate={{ 
            scale: 1,
            rotateY: [0, 5, 0, -5, 0], // Subtle 3D rotation
            boxShadow: [
              "0px 0px 30px rgba(164, 119, 171, 0.3)",
              "0px 0px 40px rgba(195, 99, 118, 0.3)",
              "0px 0px 30px rgba(237, 176, 76, 0.3)",
              "0px 0px 30px rgba(164, 119, 171, 0.3)"
            ]
          }}
          transition={{ 
            type: "spring", 
            stiffness: 60,
            rotateY: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            },
            boxShadow: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ perspective: 1000 }} // For 3D effect
        >
          {/* Logo content with animated text */}
          <div className="text-center p-4 relative z-10">
            <motion.h3 
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"
              animate={{ 
                scale: [1, 1.05, 1],
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ 
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                backgroundPosition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ backgroundSize: "300% 100%" }}
            >
              Find your vibe
            </motion.h3>
          </div>
          
          {/* Enhanced gradient border with animated glow */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(164, 119, 171, 0.2), rgba(195, 99, 118, 0.2), rgba(237, 176, 76, 0.2))",
                  "linear-gradient(225deg, rgba(164, 119, 171, 0.2), rgba(195, 99, 118, 0.2), rgba(237, 176, 76, 0.2))",
                  "linear-gradient(315deg, rgba(164, 119, 171, 0.2), rgba(195, 99, 118, 0.2), rgba(237, 176, 76, 0.2))",
                  "linear-gradient(45deg, rgba(164, 119, 171, 0.2), rgba(195, 99, 118, 0.2), rgba(237, 176, 76, 0.2))",
                ],
                backgroundPosition: ["0% 0%", "100% 100%"] 
              }}
              transition={{
                background: {
                  duration: 15,
                  repeat: Infinity
                },
                backgroundPosition: {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              style={{
                backgroundSize: "300% 300%"
              }}
            />
          </div>
          
          {/* Subtle pulsing rings emanating from center */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border border-[#a477ab]/10"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ 
                  scale: 2 + (ring * 0.3), 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 3 + ring, 
                  repeat: Infinity,
                  delay: ring * 0.8
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced orbital path with rotation and glowing effect */}
      <motion.div
        className="absolute rounded-full border border-dashed border-[#a477ab]/30"
        style={{
          width: isMobile ? "360px" : "480px",
          height: isMobile ? "360px" : "480px",
          boxShadow: "0 0 40px rgba(164, 119, 171, 0.05)"
        }}
        animate={{ 
          rotate: 360,
          boxShadow: [
            "0 0 40px rgba(164, 119, 171, 0.03)",
            "0 0 60px rgba(195, 99, 118, 0.05)",
            "0 0 40px rgba(237, 176, 76, 0.03)",
            "0 0 40px rgba(164, 119, 171, 0.03)"
          ]
        }}
        transition={{ 
          rotate: { duration: 180, repeat: Infinity, ease: "linear" },
          boxShadow: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Circular arrangement of icons with enhanced interactive hover effects */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isMobile ? "360px" : "480px",
          height: isMobile ? "360px" : "480px"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {icons.map((item, index) => {
          // Calculate position in a circle - closer radius for mobile, original for desktop
          const angle = (index / icons.length) * 2 * Math.PI;
          // Use closer radius values for mobile
          const radius = isMobile ? 160 : 220;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          // Determine up/down movement based on position
          const moveUp = angle < Math.PI;
          
          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: isMobile ? -26 : -30,
                marginTop: isMobile ? -26 : -30,
                x,
                y,
                zIndex: activeIcon === index ? 40 : 20
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                delay: 0.1 * index 
              }}
              onHoverStart={() => setActiveIcon(index)}
              onHoverEnd={() => setActiveIcon(null)}
              onClick={() => setActiveIcon(index === activeIcon ? null : index)}
            >
              {/* Icon with enhanced glowing gradient border */}
              <div className="relative">
                {/* Animated glowing gradient border with enhanced effects */}
                <motion.div
                  className="absolute -inset-1.5 rounded-xl z-0 opacity-70"
                  animate={{ 
                    boxShadow: activeIcon === index
                      ? [
                          `0 0 10px ${item.color}90, 0 0 20px ${item.color}60, 0 0 30px ${item.color}30`, 
                          `0 0 15px ${item.color}90, 0 0 30px ${item.color}60, 0 0 40px ${item.color}30`,
                          `0 0 10px ${item.color}90, 0 0 20px ${item.color}60, 0 0 30px ${item.color}30`
                        ]
                      : [
                          `0 0 5px ${item.color}90, 0 0 10px ${item.color}60, 0 0 15px ${item.color}30`, 
                          `0 0 8px ${item.color}90, 0 0 15px ${item.color}60, 0 0 20px ${item.color}30`,
                          `0 0 5px ${item.color}90, 0 0 10px ${item.color}60, 0 0 15px ${item.color}30`
                        ],
                    backgroundPosition: ["0% 0%", "200% 200%"],
                    scale: activeIcon === index ? 1.15 : 1
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}99, ${item.color}70)`,
                    backgroundSize: "300% 300%",
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    backgroundPosition: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 8, 
                      ease: "linear"
                    },
                    scale: {
                      duration: 0.3
                    }
                  }}
                />
                
                {/* Icon content with interactive hover effects */}
                <motion.div
                  className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-xl bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center relative z-10"
                  animate={{
                    y: moveUp ? [0, -12, 0] : [0, 12, 0],
                    rotate: index % 2 === 0 ? [0, 5, 0, -5, 0] : [0, -5, 0, 5, 0],
                    scale: activeIcon === index ? 1.1 : 1
                  }}
                  transition={{ 
                    y: {
                      duration: item.animationDuration,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotate: {
                      duration: item.animationDuration + 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl md:text-3xl">{item.emoji}</span>
                </motion.div>
                
                {/* Tooltip that appears on hover */}
                <AnimatePresence>
                  {activeIcon === index && (
                    <motion.div
                      className="absolute left-0 top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-md shadow-lg px-3 py-2 text-center w-max max-w-[160px] pointer-events-none"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      style={{ zIndex: 50 }}
                    >
                      <p className="font-medium text-sm" style={{ color: item.color }}>{item.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Connection lines with enhanced styling and animation */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a477ab" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#c36376" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#edb04c" stopOpacity="0.3" />
            
            <animate 
              attributeName="x1"
              values="0%;100%;0%"
              dur="15s"
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="y1"
              values="0%;100%;0%"
              dur="12s"
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="x2"
              values="100%;0%;100%"
              dur="15s"
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="y2"
              values="100%;0%;100%"
              dur="12s"
              repeatCount="indefinite" 
            />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g stroke="url(#lineGradient)" strokeWidth="1.5" filter="url(#glow)">
          {icons.map((_, index) => {
            const angle = (index / icons.length) * 2 * Math.PI;
            // Use closer radius values for mobile
            const radius = isMobile ? 160 : 220;
            const x = Math.cos(angle) * radius + 250;
            const y = Math.sin(angle) * radius + 250;
            
            return (
              <motion.line 
                key={index}
                x1="250" 
                y1="250" 
                x2={x} 
                y2={y}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.4, 0.8, 0.4],
                  strokeWidth: activeIcon === index ? 2 : 1.5
                }}
                transition={{ 
                  pathLength: { delay: 0.5 + (index * 0.1), duration: 1 },
                  opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
                  strokeWidth: { duration: 0.3 }
                }}
              />
            );
          })}
        </g>
        
        {/* Additional connection circles that pulse along the lines */}
        {icons.map((item, index) => {
          const angle = (index / icons.length) * 2 * Math.PI;
          const radius = isMobile ? 160 : 220;
          
          return (
            <motion.circle
              key={`pulse-${index}`}
              cx="250"
              cy="250"
              r="4"
              fill={`${item.color}80`}
              initial={{ opacity: 0 }}
              animate={{
                cx: 250 + Math.cos(angle) * radius * 0.3,
                cy: 250 + Math.sin(angle) * radius * 0.3,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: item.animationDuration * 0.5,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Hero;