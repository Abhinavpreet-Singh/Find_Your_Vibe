import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimationControls } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CTA = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundControls = useAnimationControls();
  
  // Handle mouse movement for spotlight effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };
  
  // Transform mouse position to spotlight position
  const spotlightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  
  // Animate background pattern
  useEffect(() => {
    backgroundControls.start({
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 20,
        ease: "linear"
      }
    });
  }, [backgroundControls]);
  
  // Split text for animation
  const ctaText = "Ready to Find Your Vibe Today?";
  const ctaLetters = ctaText.split("");

  return (
    <motion.section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c] z-0"></div>
      
      {/* Animated background patterns */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 bg-repeat"
        animate={backgroundControls}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* Interactive spotlight effect */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-white/10 blur-[80px] pointer-events-none z-0"
        style={{
          left: spotlightX,
          top: spotlightY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {/* Animated particles */}
      <ParticleField />
      
      {/* Wave effect */}
      <WaveBackground />
      
      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center">
          {/* Letter animation text */}
          <div className="mb-12 text-center overflow-hidden">
            <h2 className="inline-flex flex-wrap justify-center text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              {ctaLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.03,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className={letter === " " ? "mr-2" : ""}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h2>
            
            {/* Animated line */}
            <motion.div 
              className="h-0.5 bg-white/50 rounded-full mx-auto mt-6"
              initial={{ width: 0 }}
              animate={{ width: ["0%", "60%", "30%", "80%", "60%"] }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Enhanced animated button without fill effect */}
          <GradientBorderButton />
        </div>
      </div>
    </motion.section>
  );
};

// Background wave animation
const WaveBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-10"
          style={{
            background: `radial-gradient(50% 50% at 50% 100%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)`,
          }}
          animate={{
            y: [40, -10, 40],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Floating particles
const ParticleField = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Button with moving gradient border - no fill effect
const GradientBorderButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative"
    >
      {/* Moving gradient border */}
      <motion.div 
        className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden"
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
      
      {/* Button */}
      <motion.button
        className="relative px-10 py-5 bg-white rounded-xl shadow-xl overflow-hidden z-10 group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Button content */}
        <div className="relative flex items-center justify-center gap-2">
          <span className="font-medium text-lg text-[#a477ab]">
            Get Started
          </span>
          
          <motion.div
            animate={{ 
              x: isHovered ? 5 : 0,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="text-[#a477ab]"
          >
            <FiArrowRight />
          </motion.div>
        </div>
        
        {/* Moving highlight effect */}
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 w-full h-[150%] bg-white/30 -skew-y-12"
            initial={{ top: "-150%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </motion.button>
      
      {/* Button glow effect */}
      <motion.div 
        className="absolute inset-0 -z-10 blur-xl rounded-xl opacity-0"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        style={{ 
          background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c)",
          backgroundSize: "200% 100%",
        }}
      />
    </motion.div>
  );
};

export default CTA;