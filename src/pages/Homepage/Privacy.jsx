import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/homepage/Footer';
import Navbar from '../../components/homepage/Navbar';
import { useTheme } from '../../context/ThemeContext';

const Privacy = () => {
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
                Privacy Policy
              </span>
            </motion.h1>
            <motion.p 
              className={`mt-4 text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} max-w-3xl mx-auto`}
              variants={itemVariants}
            >
              Protecting your data and respecting your privacy is important to us
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
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Commitment to Privacy</h2>
              <p>
                At Find Your Vibe, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do
                not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Register for an account</li>
                <li>Complete your profile</li>
                <li>Participate in activities or events</li>
                <li>Contact customer support</li>
                <li>Communicate with other users</li>
              </ul>
              

              <p>
                This information may include your name, email address, profile picture, interests, hobbies, location, 
                and any other information you choose to provide.
              </p>
              
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-[#be70a9]' : 'text-gray-900'} mt-8 mb-4`}>Automatically Collected Information</h3>
              <p>
                When you access our platform, we automatically collect certain information about your device and 
                usage of the platform, including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Device information (such as your IP address, browser type, and operating system)</li>
                <li>Log information (such as access times and pages viewed)</li>
                <li>Location information (with your consent)</li>
                <li>Cookie data (see our Cookie Policy)</li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Match you with like-minded individuals and relevant activities</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Personalize your experience</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with our legal obligations</li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sharing of Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Other users (as directed by you when you share information publicly)</li>
                <li>Service providers (who need access to perform services for us)</li>
                <li>Professional advisors (like lawyers and accountants)</li>
                <li>Law enforcement (when required by law or to protect our rights)</li>
              </ul>
              <p className="mt-4">
                We will never sell your personal information to third parties for marketing purposes.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Rights and Choices</h2>
              <p>
                You have several rights regarding your personal information:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access and update your information through your account settings</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Disable cookies through your browser settings</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <span className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'}`}>privacy@findyourvibe.com</span>
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Children's Privacy</h2>
              <p>
                Our platform is not directed to children under 13, and we do not knowingly collect personal information
                from children under 13. If you learn that a child has provided us with personal information in violation
                of this policy, please contact us.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. We will notify you of any changes by posting the new
                policy on this page and updating the "Last Updated" date at the top of this policy.
              </p>
              <p className="mt-4">
                For questions about this privacy policy, please contact us at <span className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'}`}>privacy@findyourvibe.com</span>
              </p>
            </motion.section>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Privacy;