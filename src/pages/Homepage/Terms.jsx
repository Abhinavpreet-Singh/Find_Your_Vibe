import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/homepage/Footer';
import Navbar from '../../components/homepage/Navbar';
import { useTheme } from '../../context/ThemeContext';

const Terms = () => {
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
                Terms of Service
              </span>
            </motion.h1>
            <motion.p 
              className={`mt-4 text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} max-w-3xl mx-auto`}
              variants={itemVariants}
            >
              Please read these terms carefully before using our platform
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
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Acceptance of Terms</h2>
              <p>
                By accessing or using Find Your Vibe, you agree to be bound by these Terms of Service. If you 
                disagree with any part of the terms, you may not access the service.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and up-to-date information.
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming 
                aware of any breach of security or unauthorized use of your account.
              </p>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-[#be70a9]' : 'text-gray-900'} mt-8 mb-4`}>Account Termination</h3>
              <p>
                We reserve the right to suspend or terminate your account and refuse any and all current or future
                use of the Service for violations of these Terms or for any other reason at our discretion.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User Content</h2>
              <p>
                Our platform allows you to post, link, store, share and otherwise make available certain information,
                text, graphics, videos, or other material. You are responsible for the content you post and its legality.
              </p>
              <p>
                By posting content, you grant us the right and license to use, modify, publicly perform, publicly display,
                reproduce, and distribute such content on and through the platform. You retain any and all of your rights
                to any content you submit, post or display and you are responsible for protecting those rights.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Prohibited Activities</h2>
              <p>
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Using the service for any illegal purpose or in violation of any laws</li>
                <li>Posting unauthorized commercial communications</li>
                <li>Engaging in harassment, intimidation, or bullying of any user</li>
                <li>Uploading viruses or malicious code</li>
                <li>Attempting to access accounts or data belonging to others</li>
                <li>Interfering with or disrupting the service or servers</li>
                <li>Impersonating another person</li>
                <li>Collecting users' content or information without their consent</li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Find Your Vibe and its licensors. The service is protected by copyright, trademark, and
                other laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the
                prior written consent of Find Your Vibe.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Disclaimer of Warranties</h2>
              <p>
                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis.
                The service is provided without warranties of any kind, whether express or implied.
              </p>
              <p>
                Find Your Vibe and its subsidiaries, affiliates, and its licensors do not warrant that a) the service
                will function uninterrupted, secure or available at any particular time or location; b) any errors or
                defects will be corrected; c) the service is free of viruses or other harmful components; or d) the
                results of using the service will meet your requirements.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Limitation of Liability</h2>
              <p>
                In no event shall Find Your Vibe, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your access to or use of or inability to access or use the service.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of California,
                United States, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By
                continuing to access or use our Service after those revisions become effective, you agree to be
                bound by the revised terms.
              </p>
              <p className="mt-4">
                If you have any questions about these Terms, please contact us at <span className={`${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'}`}>terms@findyourvibe.com</span>
              </p>
            </motion.section>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Terms;