import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-purple/10 dark:bg-primary-purple/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary-red/10 dark:bg-primary-red/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary-gold/10 dark:bg-primary-gold/20 blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Find Your <span className="gradient-text">Vibe</span>?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Join thousands of people who are connecting, collaborating, and creating amazing things together.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-primary-purple to-primary-red text-lg shadow-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 8px 20px rgba(113, 95, 135, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.button>
            
            <motion.button
              className="px-8 py-4 rounded-full font-bold border-2 border-primary-purple dark:border-primary-gold text-primary-purple dark:text-primary-gold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 dark:text-gray-400">
              No credit card required • Free basic account • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;