import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCornerUpRight } from 'react-icons/fi';

const Testimonials = () => {
  // Color theme
  const colors = {
    lavender: "#be70a9",
    red: "#c36376",
    purple: "#a477ab",
    gold: "#edb04c"
  };

  const testimonials = [
    {
      name: "Jordan K.",
      role: "Software Engineer",
      testimonial: "I joined a hackathon team through Find Your Vibe and we ended up winning first place! The platform made it super easy to connect with teammates who had complementary skills.",
      image: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    {
      name: "Emma L.",
      role: "Music Producer",
      testimonial: "As someone new to the city, this platform helped me find other musicians to jam with. I've made both professional connections and genuine friendships here.",
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      name: "Theo J.",
      role: "Gaming Enthusiast",
      testimonial: "I've tried other platforms to find gaming buddies, but Find Your Vibe actually matches you with people who have similar playing styles and availability. Game changer!",
      image: "https://randomuser.me/api/portraits/men/58.jpg"
    },
    {
      name: "Aisha M.",
      role: "Book Club Organizer",
      testimonial: "Our book club was struggling to find new members until we created a group on Find Your Vibe. Now we have a diverse group of readers with fantastic discussions every month.",
      image: "https://randomuser.me/api/portraits/women/69.jpg"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    let interval;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  const nextTestimonial = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#edb04c]/5 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#be70a9]/5 translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="max-w-5xl mx-auto">
        {/* Heading - Made Larger with gradient "Say" */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            What Our Users {" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">
                Say
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
            Real stories from people who found their vibe
          </p>
        </motion.div>
        
        {/* Testimonial display area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-8 relative">
                {/* Quote icon */}
                <div className="absolute top-0 right-0 text-[#be70a9]/10 transform -translate-y-1/2 translate-x-1/4">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                {/* Profile section */}
                <div className="md:w-1/3 flex flex-col items-center md:items-start">
                  <div className="relative mb-4">
                    <motion.div 
                      className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover" 
                      />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-md bg-[#c36376] flex items-center justify-center text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <FiCornerUpRight size={14} />
                    </motion.div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{testimonials[currentIndex].name}</h4>
                  <p className="text-[#a477ab] font-medium">{testimonials[currentIndex].role}</p>
                  
                  <div className="flex items-center mt-3 space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-5 h-5 text-[#edb04c]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
                
                {/* Quote section */}
                <div className="md:w-2/3 flex flex-col">
                  <motion.div
                    className="h-full flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed italic relative">
                      "{testimonials[currentIndex].testimonial}"
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Navigation controls with gradient buttons */}
        <div className="flex justify-center items-center gap-8">
          {/* Arrow buttons with gradient borders */}
          <div className="flex gap-3">
            <GradientBorderButton onClick={prevTestimonial} direction="left" />
            <GradientBorderButton onClick={nextTestimonial} direction="right" />
          </div>
          
          {/* Indicator dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className="group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div 
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "w-10 h-3 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]" 
                      : "w-3 h-3 bg-gray-200 group-hover:bg-[#be70a9]/40"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                ></motion.div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Gradient border button component
const GradientBorderButton = ({ onClick, direction }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Moving gradient border */}
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
      
      <motion.button
        onClick={onClick}
        className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white text-gray-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {direction === "left" ? (
          <FiChevronLeft size={20} className={isHovered ? "text-[#be70a9]" : ""} />
        ) : (
          <FiChevronRight size={20} className={isHovered ? "text-[#be70a9]" : ""} />
        )}
      </motion.button>
    </motion.div>
  );
};

export default Testimonials;