import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/homepage/Footer';
import Navbar from '../../components/homepage/Navbar';

const Cookies = () => {
  const [activeTab, setActiveTab] = useState('essential');
  
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
              <span className="bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c] bg-clip-text text-transparent">
                Cookie Policy
              </span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Understanding how we use cookies to enhance your experience
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
              <h2 className="text-2xl font-bold text-gray-900">What Are Cookies</h2>
              <p>
                Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored
                in your web browser and allows the Service or a third-party to recognize you and make your next visit easier
                and the Service more useful to you.
              </p>
              <p className="mt-4">
                Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or
                mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">How We Use Cookies</h2>
              <p>
                When you use and access our Service, we may place a number of cookie files in your web browser.
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To enable certain functions of the Service</li>
                <li>To provide analytics</li>
                <li>To store your preferences</li>
                <li>To enable advertisements delivery, including behavioral advertising</li>
              </ul>
              <p className="mt-4">
                We use both session and persistent cookies on the Service and we use different types of cookies to run the Service.
              </p>
            </motion.section>
            
            {/* Cookie tabs */}
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>
              
              {/* Tab navigation */}
              <div className="flex flex-wrap mb-8 border-b">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-medium ${
                      activeTab === tab.id 
                        ? 'text-[#be70a9] border-b-2 border-[#be70a9]' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label} Cookies
                  </button>
                ))}
              </div>
              
              {/* Tab content */}
              <div className="mt-6">
                {activeTab === 'essential' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Essential Cookies</h3>
                    <p>
                      These cookies are essential for enabling user movement around our website and providing access to features
                      such as your profile, secure areas of the website, and other basic functionality. These cookies don't gather
                      any information about you that could be used for marketing or remembering where you've been on the internet.
                      This category of cookies cannot be disabled.
                    </p>
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-mono text-sm">session_id</span> - Manages your active session</li>
                        <li><span className="font-mono text-sm">csrf_token</span> - Security cookie for form submissions</li>
                        <li><span className="font-mono text-sm">auth_token</span> - Authenticates logged-in users</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'functional' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Functional Cookies</h3>
                    <p>
                      These cookies allow us to remember choices you make and provide enhanced, more personal features. They may
                      also be used to provide services you have asked for such as watching a video or commenting on a blog. The
                      information these cookies collect is usually anonymized. They do not gather any information about you that
                      could be used for advertising or tracking your browsing activity on other websites.
                    </p>
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-mono text-sm">language_preference</span> - Remembers your language preference</li>
                        <li><span className="font-mono text-sm">theme_preference</span> - Remembers if you prefer dark mode</li>
                        <li><span className="font-mono text-sm">recently_viewed</span> - Tracks items you've recently viewed</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'analytics' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics Cookies</h3>
                    <p>
                      These cookies help us understand how visitors interact with our website by collecting and reporting
                      information anonymously. They allow us to recognize and count the number of visitors and to see how
                      visitors move around our website when they are using it. This helps us to improve the way our website works,
                      for example, by ensuring that users are finding what they are looking for easily.
                    </p>
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-mono text-sm">_ga, _gid</span> - Google Analytics cookies for tracking user behavior</li>
                        <li><span className="font-mono text-sm">_hjid</span> - Hotjar cookie for analyzing user journeys</li>
                        <li><span className="font-mono text-sm">amplitude_id</span> - Amplitude analytics for user engagement</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'marketing' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Marketing Cookies</h3>
                    <p>
                      These cookies track your online activity to help advertisers deliver more relevant advertising or to limit
                      how many times you see an ad. These cookies can share that information with other organizations or advertisers.
                      These are persistent cookies which will stay on your device until their expiration or earlier manual deletion.
                    </p>
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-mono text-sm">_fbp</span> - Facebook tracking pixel</li>
                        <li><span className="font-mono text-sm">ads_id</span> - Used for serving targeted advertisements</li>
                        <li><span className="font-mono text-sm">mkt_user</span> - User identification for marketing purposes</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">Disabling Cookies</h2>
              <p>
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for
                how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites
                that you visit. Disabling cookies will usually result in also disabling certain functionality and features of
                the this site. Therefore it is recommended that you do not disable cookies.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of
                the Service, deliver advertisements on and through the Service, and so on.
              </p>
            </motion.section>
            
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900">More Information</h2>
              <p>
                If you are looking for more information about cookies and how they are used, we recommend these resources:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><a href="https://www.allaboutcookies.org/" className="text-[#be70a9] hover:text-[#a477ab]">All About Cookies</a></li>
                <li><a href="https://www.cookiesandyou.com/" className="text-[#be70a9] hover:text-[#a477ab]">Cookies & You</a></li>
              </ul>
              <p className="mt-4">
                For any questions about our Cookie Policy, please contact us at privacy@findyourvibe.com
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