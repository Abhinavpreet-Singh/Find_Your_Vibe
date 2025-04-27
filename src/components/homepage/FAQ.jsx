import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiInfo, FiUsers, FiDollarSign, FiTrendingUp, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const colors = {
    lavender: "#be70a9",
    red: "#c36376",
    purple: "#a477ab",
    gold: "#edb04c"
  };
  
  const faqItems = [
    {
      icon: <FiUsers size={20} />,
      question: "How do I find people for my hobby?",
      answer: "You can browse the Hobbies section to find people with similar interests. Use filters to narrow down by specific hobbies and location. Once you find someone interesting, you can send them a connection request."
    },
    {
      icon: <FiTrendingUp size={20} />,
      question: "Can I form a hackathon team?",
      answer: "Yes! In the Hackathons section, you can either join an existing team looking for members or create your own team and specify what roles you're looking for. We also notify you about upcoming hackathons that match your skills and interests."
    },
    {
      icon: <FiDollarSign size={20} />,
      question: "Is this platform free?",
      answer: "Find Your Vibe offers a free tier with access to basic features. We also offer premium plans with additional features like advanced filters, message priority, and unlimited connections. Check our Pricing page for more details."
    },
    {
      icon: <FiInfo size={20} />,
      question: "How does the matching algorithm work?",
      answer: "Our matching algorithm considers your interests, skills, location preferences, and past connections to suggest potential matches. The more you use the platform, the better our recommendations become as we learn your preferences."
    },
    {
      icon: <FiCalendar size={20} />,
      question: "Can I organize my own events?",
      answer: "Absolutely! Premium users can create and promote events on the platform, inviting both their connections and other users with relevant interests. This is perfect for hobby meetups, jam sessions, or coding workshops."
    }
  ];
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#edb04c]/5 -translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#be70a9]/5 translate-y-1/3 translate-x-1/4"></div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#c36376]/30"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-[#a477ab]/20"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            delay: 1,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#edb04c]/30"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4.5,
            delay: 2,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Heading with gradient text "Questions" */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked {" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">
                Questions
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
            Find answers to common questions about our platform
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* FAQ Item with moving gradient border when active */}
              <div className="relative">
                {activeIndex === index && (
                  <motion.div 
                    className="absolute -inset-[2px] rounded-xl z-0 overflow-hidden"
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
                )}
                
                <div className={`relative z-10 bg-white border ${activeIndex === index ? "border-transparent" : "border-gray-100"} rounded-xl shadow-md overflow-hidden`}>
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeIndex === index 
                          ? "bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white" 
                          : "bg-gray-100 text-[#a477ab]"
                      }`}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-800">{item.question}</span>
                    </span>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        activeIndex === index ? "bg-[#a477ab]/10 text-[#a477ab]" : "bg-gray-100"
                      }`}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <motion.div 
                          className="px-6 py-5 pl-20 text-gray-600 border-t border-gray-100"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {item.answer}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">Still have questions? We're here to help.</p>
          
          {/* Smaller button with only gradient border, no fill */}
          <GradientBorderButton />
        </motion.div>
      </div>
    </section>
  );
};

// Smaller button with just gradient border, no fill
const GradientBorderButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook
  
  const handleClick = () => {
    navigate('/contact'); // Navigate to contact page on click
  };
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative inline-block"
    >
      {/* Moving gradient border - made thicker (2px) */}
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
      
      {/* Button with white background, no gradient fill */}
      <motion.button
        className="relative px-6 py-2.5 rounded-full z-10 bg-white shadow-sm"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
      >
        {/* Button content */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="font-medium text-[#a477ab]">
            Contact Support
          </span>
          
          <motion.div
            animate={{ 
              x: isHovered ? 3 : 0
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-[#a477ab]"
          >
            <FiArrowRight size={16} />
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default FAQ;