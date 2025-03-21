import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqItems = [
    {
      question: "How do I find people for my hobby?",
      answer: "You can browse the Hobbies section to find people with similar interests. Use filters to narrow down by specific hobbies and location. Once you find someone interesting, you can send them a connection request."
    },
    {
      question: "Can I form a hackathon team?",
      answer: "Yes! In the Hackathons section, you can either join an existing team looking for members or create your own team and specify what roles you're looking for. We also notify you about upcoming hackathons that match your skills and interests."
    },
    {
      question: "Is this platform free?",
      answer: "Find Your Vibe offers a free tier with access to basic features. We also offer premium plans with additional features like advanced filters, message priority, and unlimited connections. Check our Pricing page for more details."
    },
    {
      question: "How does the matching algorithm work?",
      answer: "Our matching algorithm considers your interests, skills, location preferences, and past connections to suggest potential matches. The more you use the platform, the better our recommendations become as we learn your preferences."
    },
    {
      question: "Can I organize my own events?",
      answer: "Absolutely! Premium users can create and promote events on the platform, inviting both their connections and other users with relevant interests. This is perfect for hobby meetups, jam sessions, or coding workshops."
    }
  ];
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 md:px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about Find Your Vibe.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden ${
                activeIndex === index ? "shadow-md" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                  activeIndex === index 
                    ? "bg-gradient-to-r from-primary-purple/10 to-primary-red/10 dark:from-primary-purple/20 dark:to-primary-red/20" 
                    : "bg-white dark:bg-gray-800"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-lg">{item.question}</span>
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800"
                  >
                    <div className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;