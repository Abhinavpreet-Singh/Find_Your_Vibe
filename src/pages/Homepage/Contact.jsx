import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';
import Navbar from '../../components/homepage/Navbar';
import Footer from '../../components/homepage/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Explicitly scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, you would send the data to your backend here
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <section className="pt-28 pb-20 px-4 bg-white relative overflow-hidden">
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
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Heading with gradient text */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in {" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">
                  Touch
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
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help you find your vibe.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div 
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#a477ab]/10 flex items-center justify-center mr-4 text-[#a477ab]">
                      <FiMail size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Email</h3>
                      <a href="mailto:support@findyourvibe.com" className="text-[#a477ab] hover:underline">
                        support@findyourvibe.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Response Time</h3>
                    <p className="text-gray-600">
                      Our team typically responds within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FiCheck className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Your Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <FiUser />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a477ab]/50 focus:border-[#a477ab] transition-colors"
                            placeholder="your name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <FiMail />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a477ab]/50 focus:border-[#a477ab] transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a477ab]/50 focus:border-[#a477ab] transition-colors"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-500">
                          <FiMessageSquare />
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a477ab]/50 focus:border-[#a477ab] transition-colors resize-none"
                          placeholder="Please describe how we can help you..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-lg font-medium shadow-md text-white bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c] overflow-hidden relative"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <FiSend className="mr-2" /> Send Message
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;