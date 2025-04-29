import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/homepage/Footer';
import Navbar from '../../components/homepage/Navbar';
import { useTheme } from '../../context/ThemeContext';

const Cookies = () => {
  const { isDarkMode } = useTheme();
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const tabs = [
    { id: 'essential', label: 'Essential' },
    { id: 'functional', label: 'Functional' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'marketing', label: 'Marketing' }
  ];

  return (
    <>
      <Navbar />
      <motion.div 
        className={`min-h-screen ${isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-500'}`}
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-[#be70a9] to-[#a477ab] bg-clip-text text-transparent">
                Cookie Policy
              </span>
            </motion.h1>
            <motion.p 
              className={`mt-4 text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} max-w-3xl mx-auto`}
              variants={itemVariants}
            >
              How we use cookies and similar technologies
            </motion.p>
            <motion.p 
              className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              variants={itemVariants}
            >
              Last updated: April 28, 2025
            </motion.p>
          </motion.div>
          
          <div className={`prose prose-lg ${isDarkMode ? 'prose-invert' : 'prose-indigo'} mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p>
                Cookies help us enhance your experience on our platform by:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Keeping you signed in</li>
                <li>Understanding how you use our website</li>
                <li>Remembering your preferences</li>
                <li>Personalizing content and recommendations</li>
                <li>Improving overall site performance</li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Types of Cookies We Use</h2>
              
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-[#be70a9]' : 'text-gray-900'} mt-8 mb-4`}>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such
                as security, network management, and account access. You may disable these by changing your browser
                settings, but this may affect how the website functions.
              </p>
              
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-[#be70a9]' : 'text-gray-900'} mt-8 mb-4`}>Analytics Cookies</h3>
              <p>
                We use analytics cookies to collect information about how visitors use our website. These cookies help
                us improve our site and provide the best experience for users by collecting and reporting information
                anonymously.
              </p>
              
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-[#be70a9]' : 'text-gray-900'} mt-8 mb-4`}>Functionality Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make (such as your username, language or the
                region you are in) and provide enhanced, more personal features. They may be set by us or by third party
                providers whose services we have added to our pages.
              </p>
              
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-[#be70a9]' : 'text-gray-900'} mt-8 mb-4`}>Advertising Cookies</h3>
              <p>
                These cookies may be set through our site by our advertising partners. They may be used by those companies
                to build a profile of your interests and show you relevant advertisements on other sites. They do not
                directly store personal information but are based on uniquely identifying your browser and internet device.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
                deliver advertisements, and so on. These cookies may include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Google Analytics (for traffic analysis)</li>
                <li>Facebook Pixel (for marketing effectiveness)</li>
                <li>Stripe (for payment processing)</li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. However, limiting
                the ability of websites to set cookies may worsen your overall user experience and could impact certain
                features and functions of our site.
              </p>
              
              <p>
                To modify your cookie settings, please refer to the instructions in your browser's help section. Below are
                links to instructions for some popular browsers:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a href="#" className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'} hover:underline`}>
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="#" className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'} hover:underline`}>
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="#" className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'} hover:underline`}>
                    Safari
                  </a>
                </li>
                <li>
                  <a href="#" className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'} hover:underline`}>
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cookie Consent</h2>
              <p>
                When you first visit our website, you will be shown a cookie banner requesting your consent to set
                non-essential cookies. You can change your cookie preferences at any time by clicking on the
                "Cookie Settings" link in the footer of our website.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Updates to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the
                new Cookie Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="mt-4">
                For questions about cookies or this Cookie Policy, please contact us at <span className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'}`}>privacy@findyourvibe.com</span>
              </p>
            </motion.section>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Cookies;