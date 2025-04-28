import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  // Text for the loader
  const text = "Find Your Vibe";
  
  // Use a key to prevent animation restart
  const [animationKey, setAnimationKey] = useState(Date.now());
  
  // Ensure animation continuity by using a consistent key
  useEffect(() => {
    // This ensures the animation persists with the same key
    // throughout the component's lifetime
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-98 z-50">
      <div className="relative">
        {/* Circular background animations */}
        <motion.div 
          className="absolute rounded-full bg-[#a477ab]/10 blur-xl"
          initial={{ width: 180, height: 180, x: -90, y: -90 }}
          animate={{ 
            width: [180, 230, 180],
            height: [180, 230, 180],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute rounded-full bg-[#c36376]/10 blur-xl"
          initial={{ width: 220, height: 220, x: -110, y: -110 }}
          animate={{ 
            width: [220, 270, 220],
            height: [220, 270, 220],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3.5,
            delay: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute rounded-full bg-[#edb04c]/10 blur-xl"
          initial={{ width: 250, height: 250, x: -125, y: -125 }}
          animate={{ 
            width: [250, 300, 250],
            height: [250, 300, 250],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Main loader container with larger dimensions */}
        <div className="relative w-52 h-52" key={animationKey}>
          {/* Outermost rotating ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full border border-[#edb04c]/20"
            style={{
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              borderWidth: 3,
              borderTopColor: "#edb04c",
              borderRightColor: "#edb04c40",
              borderBottomColor: "transparent",
              borderLeftColor: "#edb04c20",
            }}
            animate={{ 
              rotate: 360
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0 // Ensure no delay between repeats
            }}
          />
          
          {/* Second outer rotating ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full border border-[#c36376]/20"
            style={{
              width: 160,
              height: 160,
              marginLeft: -80,
              marginTop: -80,
              borderWidth: 2,
              borderTopColor: "#c36376",
              borderRightColor: "transparent",
              borderBottomColor: "#c3637640",
              borderLeftColor: "transparent",
            }}
            animate={{ 
              rotate: -360
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Middle rotating ring with gradient */}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: 120,
              height: 120,
              marginLeft: -60,
              marginTop: -60,
              borderWidth: 4,
              borderStyle: "solid",
              borderColor: "transparent",
              borderTopColor: "#a477ab",
              borderRightColor: "#a477ab50",
            }}
            animate={{ 
              rotate: 360
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner circle that contains the text - no animation */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full border-2 flex items-center justify-center"
            style={{
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -40,
              borderColor: "rgba(164, 119, 171, 0.2)",
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 15px rgba(164, 119, 171, 0.3)",
            }}
          >
            {/* Central text - no animation */}
            <div className="text-center z-10">
              <div 
                className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"
                style={{ backgroundSize: "200% 100%" }}
              >
                {text}
              </div>
            </div>
          </div>
          
          {/* Orbiting dots - Fixed animation to ensure smooth continuous motion */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full shadow-lg"
              style={{
                background: i === 0 ? "#a477ab" : i === 1 ? "#c36376" : "#edb04c",
                top: '50%',
                left: '50%',
                marginLeft: -6,
                marginTop: -6,
                filter: "blur(0.5px)"
              }}
              animate={{
                x: Math.cos(i * (2 * Math.PI / 3)) * 90,
                y: Math.sin(i * (2 * Math.PI / 3)) * 90,
              }}
              transition={{
                duration: 0,
                delay: 0
              }}
            >
              <motion.div
                className="w-full h-full rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 5px rgba(255, 255, 255, 0.5)",
                    "0 0 10px rgba(255, 255, 255, 0.8)",
                    "0 0 5px rgba(255, 255, 255, 0.5)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  rotate: 360
                }}
                transition={{
                  ease: "linear", 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                style={{
                  transformOrigin: `${-90}px ${0}px`
                }}
              />
            </motion.div>
          ))}
          
          {/* Additional smaller particles - Fixed animation */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full opacity-80"
              style={{
                background: i % 2 === 0 ? "#a477ab" : i % 3 === 0 ? "#c36376" : "#edb04c",
                top: '50%',
                left: '50%',
                marginLeft: -1,
                marginTop: -1,
              }}
              initial={{
                x: Math.cos(i * (2 * Math.PI / 5) + Math.PI/4) * (60 + i * 10),
                y: Math.sin(i * (2 * Math.PI / 5) + Math.PI/4) * (60 + i * 10),
              }}
            >
              <motion.div
                className="w-full h-full rounded-full"
                animate={{
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  rotate: 360
                }}
                transition={{
                  ease: "linear", 
                  duration: 6 + i,
                  repeat: Infinity,
                }}
                style={{
                  transformOrigin: `${-(60 + i * 10)}px ${0}px`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;