import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-24 pb-20 md:pt-28 md:pb-28 px-4 overflow-hidden">
      {/* Simple gradient background without animations */}
      <div className="absolute inset-0 z-0">
        {/* Static gradients */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#be70a9]/10 blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-[500px] h-[500px] rounded-full bg-[#edb04c]/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-60 w-[550px] h-[550px] rounded-full bg-[#c36376]/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Text Content */}
        <div>
          {/* Simple highlight badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#a477ab]/20 shadow-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#a477ab] to-[#c36376] mr-2"></div>
            <span className="text-sm font-medium text-gray-700">
              Connect. Collaborate. Grow Together.
            </span>
          </div>
          
          {/* Enlarged Heading in a single line */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight tracking-tight">
            Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">Vibe</span>
          </h1>
          
          {/* Slogan */}
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            Your Network is Your Net Worth
          </p>
          
          {/* Description paragraph */}
          <p className="text-lg text-gray-600 max-w-lg mb-8">
            Connect with like-minded individuals who share your passions.
            Build meaningful relationships and unlock endless opportunities 
            through our vibrant community platform.
          </p>
          
          {/* Buttons with enhanced hover */}
          <div className="flex flex-wrap gap-6 items-center">
            {/* Get Started Button with Enhanced Gradient Border & Hover */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient border */}
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
                  duration: 8,
                  ease: "linear"
                }}
              />
              
              {/* Button content */}
              <button className="relative px-7 py-4 rounded-full bg-white shadow-md z-10 flex items-center gap-2 transition-all duration-300 group-hover:bg-gray-50">
                <span className="font-semibold text-lg text-[#a477ab]">Get Started Now</span>
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
              
              {/* Animated underline on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#a477ab]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
        </div>
        
        {/* Visual Content with floating icons arranged in a circle */}
        <div className="relative h-[400px] md:h-[500px]">
          <FloatingIconsWithGlowingBorders isLoaded={isLoaded} />
        </div>
      </div>
      
      {/* Full-width Enhanced Animated Gradient Wave Separator - moved back to bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <FullWidthAnimatedWave />
      </div>
    </section>
  );
};

// Updated floating elements with glowing gradient borders and no text labels
const FloatingIconsWithGlowingBorders = ({ isLoaded }) => {
  // Define icons and themes with colors
  const icons = [
    { emoji: "💻", color: "#a477ab", animationDuration: 8 },
    { emoji: "🎮", color: "#c36376", animationDuration: 10 },
    { emoji: "🎸", color: "#edb04c", animationDuration: 9 },
    { emoji: "📚", color: "#a477ab", animationDuration: 12 },
    { emoji: "🏋️", color: "#c36376", animationDuration: 11 },
    { emoji: "🎨", color: "#edb04c", animationDuration: 13 },
    { emoji: "🌱", color: "#a477ab", animationDuration: 9 },
    { emoji: "🍳", color: "#c36376", animationDuration: 10 }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Main central logo */}
      <div className="absolute z-30">
        <motion.div 
          className="relative w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-xl overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
        >
          {/* Logo content */}
          <div className="text-center p-4 relative z-10">
            <motion.h3 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              Find Your Vibe
            </motion.h3>
            <p className="text-sm text-gray-600 mt-1">Connect & Thrive</p>
          </div>
          
          {/* Simple gradient border */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#a477ab]/20 via-[#c36376]/20 to-[#edb04c]/20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"] 
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                backgroundSize: "300% 300%"
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Orbital path with rotation */}
      <motion.div
        className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-[#a477ab]/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Circular arrangement of icons with glowing borders */}
      <motion.div
        className="absolute w-[480px] h-[480px] rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {icons.map((item, index) => {
          // Calculate position in a circle
          const angle = (index / icons.length) * 2 * Math.PI;
          const radius = 220;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          // Determine up/down movement based on position
          const moveUp = angle < Math.PI;
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -30,
                marginTop: -30,
                x,
                y
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                delay: 0.1 * index 
              }}
            >
              {/* Icon with glowing gradient border */}
              <div className="relative">
                {/* Animated glowing gradient border */}
                <motion.div
                  className="absolute -inset-1.5 rounded-xl z-0 opacity-70"
                  animate={{ 
                    boxShadow: [
                      `0 0 5px ${item.color}90, 0 0 10px ${item.color}60, 0 0 15px ${item.color}30`, 
                      `0 0 8px ${item.color}90, 0 0 15px ${item.color}60, 0 0 20px ${item.color}30`,
                      `0 0 5px ${item.color}90, 0 0 10px ${item.color}60, 0 0 15px ${item.color}30`
                    ],
                    backgroundPosition: ["0% 0%", "200% 200%"],
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
                    }
                  }}
                />
                
                {/* Icon content */}
                <motion.div
                  className="w-[60px] h-[60px] rounded-xl bg-white shadow-lg flex items-center justify-center relative z-10"
                  animate={{ 
                    y: moveUp ? [0, -15, 0] : [0, 15, 0],
                    rotate: index % 2 === 0 ? [0, 5, 0, -5, 0] : [0, -5, 0, 5, 0]
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
                    }
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    boxShadow: `0 10px 25px ${item.color}40`
                  }}
                >
                  <span className="text-3xl">{item.emoji}</span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a477ab" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#c36376" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#edb04c" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        <g stroke="url(#lineGradient)" strokeWidth="1">
          {icons.map((_, index) => {
            const angle = (index / icons.length) * 2 * Math.PI;
            const radius = 220;
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
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

// Full Width Animated Wave with enhanced animation
const FullWidthAnimatedWave = () => {
  return (
    <div className="relative h-[150px]">
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0"
        style={{ 
          width: "100vw", 
          left: "50%", 
          transform: "translateX(-50%)",
          maxWidth: "none"
        }}
      >
        <defs>
          {/* Dynamic animated gradient */}
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <animate
              attributeName="x1"
              values="0%;100%;0%"
              dur="15s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="100%;200%;100%"
              dur="15s"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor="#a477ab" stopOpacity="0.2">
              <animate
                attributeName="stop-color"
                values="#a477ab;#c36376;#edb04c;#a477ab"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#edb04c" stopOpacity="0.2">
              <animate
                attributeName="stop-color"
                values="#edb04c;#a477ab;#c36376;#edb04c"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <animate
              attributeName="x1"
              values="0%;100%;0%"
              dur="12s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="100%;200%;100%"
              dur="12s"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor="#c36376" stopOpacity="0.15">
              <animate
                attributeName="stop-color"
                values="#c36376;#edb04c;#a477ab;#c36376"
                dur="12s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#a477ab" stopOpacity="0.15">
              <animate
                attributeName="stop-color"
                values="#a477ab;#c36376;#edb04c;#a477ab"
                dur="12s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <animate
              attributeName="x1"
              values="0%;100%;0%"
              dur="18s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="100%;200%;100%"
              dur="18s"
              repeatCount="indefinite"
            />
            <stop offset="0%" stopColor="#edb04c" stopOpacity="0.1">
              <animate
                attributeName="stop-color"
                values="#edb04c;#a477ab;#c36376;#edb04c"
                dur="15s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#c36376" stopOpacity="0.1">
              <animate
                attributeName="stop-color"
                values="#c36376;#edb04c;#a477ab;#c36376"
                dur="15s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          {/* Create wave animation with enhanced morphing */}
          <path 
            id="wavePath1"
            d="M0,0V70c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,52.43,512.34,73.67,583,92.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,45,1113,5.71,1200,72.47V0Z"
          >
            <animate
              attributeName="d"
              values="
                M0,0V70c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,52.43,512.34,73.67,583,92.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,45,1113,5.71,1200,72.47V0Z;
                M0,0V70c77.79,12.2,153.59,52.17,208,18,50.36-35.37,106.33-13.31,176.8-67.5C458.64,12.43,532.34,93.67,583,62.05c89.27-58,118.3,44.88,189.4,43.08,46.15-16,89.85-37.84,124.45-19.34C979.49,95,1113,24.29,1200,52.47V0Z;
                M0,0V70c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,52.43,512.34,73.67,583,92.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,45,1113,5.71,1200,72.47V0Z
              "
              dur="20s"
              repeatCount="indefinite"
            />
          </path>
          
          <path 
            id="wavePath2"
            d="M0,0V35.81C13,56.92,27.64,76.86,47.69,92.05,99.41,131.27,165,131,224.58,111.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          >
            <animate
              attributeName="d"
              values="
                M0,0V35.81C13,56.92,27.64,76.86,47.69,92.05,99.41,131.27,165,131,224.58,111.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z;
                M0,0V55.81C33,46.92,57.64,66.86,87.69,82.05,129.41,101.27,185,111,244.58,91.58c51.15-40.15,40.09-26.07,79.67-69.8,60.92-29,94.73-26,140.83-19.67,46.26-22.85,70.9,49.42,118.6,31.56,41.77,25.39,52.32,52,103.63,103,50.44,10.79,91.35-36.69,119.13-24.28s65.16-29,136.92-73.05c49.73-15.85,103.28,42.88,158.9,38.84,40.2,18.66,49,26.17,87.09-27.5,12.43-30.89,38-26.93,60.65-39.24V0Z;
                M0,0V35.81C13,56.92,27.64,76.86,47.69,92.05,99.41,131.27,165,131,224.58,111.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z
              "
              dur="25s"
              repeatCount="indefinite"
            />
          </path>
          
          <path 
            id="wavePath3"
            d="M0,0V15.63C149.93,69,314.09,81.32,475.83,52.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,87.22,886,105.24,951.2,100c86.53-7,172.46-45.71,248.8-84.81V0Z"
          >
            <animate
              attributeName="d"
              values="
                M0,0V15.63C149.93,69,314.09,81.32,475.83,52.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,87.22,886,105.24,951.2,100c86.53-7,172.46-45.71,248.8-84.81V0Z;
                M0,0V35.63C129.93,49,294.09,61.32,455.83,32.57c63-17.64,104.23-10.12,157.61-46.46c39-18.63,102.48,42.24,195.56,25.4C857.93,47.22,886,75.24,951.2,80c96.53-17,192.46-35.71,268.8-74.81V0Z;
                M0,0V15.63C149.93,69,314.09,81.32,475.83,52.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,87.22,886,105.24,951.2,100c86.53-7,172.46-45.71,248.8-84.81V0Z
              "
              dur="30s"
              repeatCount="indefinite"
            />
          </path>
        </defs>
        
        {/* Use the paths with animated gradients */}
        <use xlinkHref="#wavePath1" fill="url(#waveGradient1)" />
        <use xlinkHref="#wavePath2" fill="url(#waveGradient2)" />
        <use xlinkHref="#wavePath3" fill="url(#waveGradient3)" />
      </svg>
      
      {/* White fade overlay for smooth transition */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;