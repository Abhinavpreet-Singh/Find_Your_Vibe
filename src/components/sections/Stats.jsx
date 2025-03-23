import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  // Animation for counting up numbers
  const [isInView, setIsInView] = useState(false);

  // Stats data with their final values
  const stats = [
    { value: 1000, label: "Active Users", color: "#a477ab", suffix: "+" },
    { value: 250, label: "Projects Created", color: "#edb04c", suffix: "+" },
    { value: 50, label: "Hackathons Supported", color: "#c36376", suffix: "+" },
    { value: 100, label: "Satisfaction Rate", color: "gradient", suffix: "%" }
  ];

  return (
    <section id="stats" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#edb04c]/5 rounded-full -translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#be70a9]/5 rounded-full translate-y-1/3 translate-x-1/4 blur-3xl"></div>
        
        {/* Animated decoration elements */}
        <motion.div 
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#c36376]/20 rounded-full"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 6
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-[#a477ab]/20 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 7,
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">
                Stats
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-[#a477ab]/20 via-[#c36376]/20 to-[#edb04c]/20 blur-sm -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              ></motion.span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find Your Vibe has helped thousands of people connect and collaborate 
            on projects they're passionate about.
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Gradient Border Card */}
              <div className="relative">
                <motion.div 
                  className="absolute -inset-[2px] rounded-2xl z-0 overflow-hidden opacity-0 group-hover:opacity-100"
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
                
                <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10 h-full flex flex-col items-center justify-center">
                  <motion.div 
                    className="w-16 h-16 rounded-full mb-5 flex items-center justify-center"
                    style={{ 
                      background: stat.color === "gradient" 
                        ? "linear-gradient(135deg, #a477ab, #c36376, #edb04c)" 
                        : `${stat.color}15`
                    }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full"
                      style={{ 
                        background: stat.color === "gradient" 
                          ? "linear-gradient(135deg, #a477ab, #c36376, #edb04c)" 
                          : stat.color,
                        opacity: 0.9
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                  </motion.div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <CountUp 
                        end={stat.value} 
                        isInView={isInView} 
                        color={stat.color}
                        duration={2}
                      />
                      <span 
                        className={
                          stat.color === "gradient"
                            ? "text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"
                            : "text-4xl font-bold"
                        }
                        style={{ color: stat.color !== "gradient" ? stat.color : undefined }}
                      >
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-2 text-lg font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom highlight gradient */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-[#a477ab]/0 via-[#a477ab]/20 to-[#a477ab]/0 blur-md" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animation component for counting up numbers
const CountUp = ({ end, isInView, color, duration }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(progressPercent * end));
      
      if (progressPercent < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [isInView, end, duration]);
  
  return (
    <span 
      className={
        color === "gradient"
          ? "text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"
          : "text-4xl font-bold"
      }
      style={{ color: color !== "gradient" ? color : undefined }}
    >
      {count}
    </span>
  );
};

export default Stats;