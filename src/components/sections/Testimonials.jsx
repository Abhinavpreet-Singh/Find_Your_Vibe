import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Testimonials = () => {
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
    <section className="py-16 px-4 md:px-6 lg:px-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users <span className="gradient-text">Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from people who found their vibe on our platform.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-lg"
              >
                <div className="md:w-1/3">
                  <div className="relative">
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary-purple dark:border-primary-gold">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <svg className="absolute top-0 left-0 w-12 h-12 text-primary-purple dark:text-primary-gold opacity-20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-xl">{testimonials[currentIndex].name}</h4>
                    <p className="text-primary-purple dark:text-primary-gold">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="relative">
                    <motion.p 
                      className="text-lg md:text-xl leading-relaxed italic text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      "{testimonials[currentIndex].testimonial}"
                    </motion.p>
                    <svg className="absolute bottom-0 right-0 w-12 h-12 text-primary-purple dark:text-primary-gold opacity-20 transform rotate-180" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={20} />
            </motion.button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "w-6 bg-primary-purple dark:bg-primary-gold" 
                      : "w-3 bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;