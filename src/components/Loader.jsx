import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        <motion.div 
          className="relative w-20 h-20 mx-auto mb-4"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Animated gradient circle */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{
                background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                backgroundSize: "300% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"],
              }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </div>
          
          {/* Inner white circle */}
          <div className="absolute inset-[3px] bg-white rounded-full flex items-center justify-center">
            {/* Three dots */}
            <div className="flex space-x-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#a477ab] to-[#c36376]"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c36376] to-[#edb04c]"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#edb04c] to-[#a477ab]"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-lg font-medium text-[#a477ab]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;