import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Hackathons", href: "/hackathons" },
        { name: "Music", href: "/music" },
        { name: "Hobbies", href: "/hobbies" },
        { name: "Events", href: "/events" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <FiTwitter size={20} />, href: "#", label: "Twitter" },
    { icon: <FiInstagram size={20} />, href: "#", label: "Instagram" },
    { icon: <FiGithub size={20} />, href: "#", label: "GitHub" },
    { icon: <FiLinkedin size={20} />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 px-4 md:px-6 lg:px-10 relative">
      {/* Top wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="50"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          className={isDarkMode ? "fill-gray-800" : "fill-white"}
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Footer Logo and Description */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <motion.div
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-purple to-primary-red flex items-center justify-center text-white font-bold text-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                FYV
              </motion.div>
              <span className="ml-2 text-xl font-bold">
                Find Your <span className="gradient-text">Vibe</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 pr-4">
              Connect with like-minded individuals who share your passions. 
              From hackathons to music jams to gaming nights – find your people.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-gold border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-purple dark:hover:text-primary-gold transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-semibold text-lg mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get the latest updates on new features and upcoming events.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-purple dark:focus:ring-primary-gold"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-primary-purple to-primary-red text-white font-medium rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Find Your Vibe. All rights reserved.
          </p>
          <div className="flex items-center justify-center mt-2 text-gray-500 dark:text-gray-400 text-sm">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;