import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/homepage/Footer';
import Navbar from '../../components/homepage/Navbar';

const Terms = () => {
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
        className="min-h-screen bg-white"
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
              <span className="bg-gradient-to-r from-[#c36376] to-[#edb04c] bg-clip-text text-transparent">
                Terms of Service
              </span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Guidelines for using our platform and community
            </motion.p>
            <motion.p 
              className="mt-2 text-sm text-gray-500"
              variants={itemVariants}
            >
              Last updated: April 28, 2025
            </motion.p>
          </motion.div>
          
          <div className="prose prose-lg prose-indigo mx-auto text-gray-500">
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">1. Agreement to Terms</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the Find Your Vibe platform, including our website, 
                mobile applications, and any services offered through the platform (collectively, the "Service"). By accessing or using 
                the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">2. Account Registration</h2>
              <p>
                To use certain features of the Service, you may be required to create an account. When you register for an account, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account and password</li>
                <li>Accept all responsibility for activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
              </ul>
              <p className="mt-4">
                We reserve the right to terminate or suspend your account at any time for any reason without notice.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">3. User Responsibilities</h2>
              <p>
                You are responsible for your use of the Service and for any content you provide, including compliance with applicable laws,
                rules, and regulations. You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Post or transmit content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
                <li>Impersonate any person or entity or falsely represent your affiliation with a person or entity</li>
                <li>Engage in any activity that interferes with or disrupts the Service</li>
                <li>Attempt to gain unauthorized access to the Service or its related systems or networks</li>
                <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Harass, abuse, or harm another person or group</li>
                <li>Collect or store personal data about other users without their express permission</li>
              </ul>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">4. Content and Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Find Your Vibe and are protected by international
                copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className="mt-4">
                By submitting content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify,
                adapt, publish, translate, create derivative works from, distribute, and display such content in any media. This license allows
                us to make your content available to the rest of the world and to let others do the same.
              </p>
              <p className="mt-4">
                You represent and warrant that you own or control all rights to the content you post, that the content is accurate, and that use
                of the content does not violate these Terms and will not cause injury to any person or entity.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">5. Third-Party Links and Services</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by Find Your Vibe. We have no
                control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                You further acknowledge and agree that Find Your Vibe shall not be responsible or liable, directly or indirectly, for any damage or
                loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available
                on or through any such websites or services.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">6. Limitation of Liability</h2>
              <p>
                In no event shall Find Your Vibe, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content
                of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of
                your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether
                or not we have been informed of the possibility of such damage.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide
                at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900">8. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms
                is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
              <p className="mt-4">
                For any questions about these Terms, please contact us at legal@findyourvibe.com
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