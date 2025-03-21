import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-6 lg:px-10 overflow-hidden relative">
      {/* Background gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-purple/10 dark:bg-primary-purple/20 blur-3xl"></div>
        <div className="absolute top-60 -left-20 w-72 h-72 rounded-full bg-primary-gold/10 dark:bg-primary-gold/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-60 w-80 h-80 rounded-full bg-primary-red/10 dark:bg-primary-red/20 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Find Your Tribe. <br />
            <span className="gradient-text">Build Your Circle.</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Connect with like-minded individuals who share your passions. 
            From hackathons to music jams to gaming nights – find your people.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 20px rgba(113, 95, 135, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Now</span>
              <FiArrowRight />
            </motion.button>
            
            <a 
              href="#hobbies" 
              className="text-primary-purple dark:text-primary-gold font-medium hover:underline"
            >
              Explore Interests →
            </a>
          </motion.div>
          
          <motion.div
            className="mt-8 grid grid-cols-3 gap-4 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">500+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">100+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Teams</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">50+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Events</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* 3D Illustration */}
        <motion.div
          className="relative h-[350px] md:h-[450px] lg:h-[500px]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
            {/* This would be replaced with your actual 3D illustration */}
            <div className="w-full h-full bg-gradient-to-br from-primary-purple/20 via-primary-gold/20 to-primary-red/20 dark:from-primary-purple/30 dark:via-primary-gold/30 dark:to-primary-red/30 animate-gradient-x">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary-purple/30 dark:bg-primary-purple/40 blur-md"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-primary-gold/30 dark:bg-primary-gold/40 blur-md"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary-red/30 dark:bg-primary-red/40 blur-md"></div>
                
                {/* Icons representing different activities */}
                <motion.div 
                  className="absolute top-10 right-12 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, type: "spring" }}
                >
                  <span className="text-xl">👨‍💻</span>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/4 left-8 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                >
                  <span className="text-xl">🎮</span>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-12 left-14 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                >
                  <span className="text-xl">🎸</span>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-16 right-14 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
                >
                  <span className="text-xl">📚</span>
                </motion.div>
                
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-full w-32 h-32 flex items-center justify-center shadow-xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                >
                  <div className="text-center">
                    <h3 className="gradient-text font-bold">Find Your Vibe</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Connect & Collaborate</p>
                  </div>
                </motion.div>
                
                {/* Connection lines (simplified) */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%" className="stroke-primary-purple dark:stroke-primary-gold">
                    <line x1="50%" y1="50%" x2="20%" y2="25%" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="20%" y2="75%" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="80%" y2="25%" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="80%" y2="75%" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="50"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-gray-50 dark:fill-gray-900"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;