import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hobbies = () => {
  // Current date for reference only (not displayed)
  const currentDate = "2025-03-23 13:03:54";
  
  // Hobby category cards with basic information
  const hobbyCategories = [
    {
      id: 'arts',
      emoji: '🎨',
      title: 'Arts & Craft',
      description: 'Unleash creativity with painting, DIY projects, and crafting sessions',
      color: '#a477ab',
      tags: ['Creativity', 'DIY', 'Workshops']
    },
    {
      id: 'sports',
      emoji: '🏸',
      title: 'Sports & Fitness',
      description: 'Find gym partners, play badminton, football, and stay active together',
      color: '#c36376',
      tags: ['Active', 'Team Sports', 'Training']
    },
    {
      id: 'books',
      emoji: '📚',
      title: 'Book Clubs',
      description: 'Discuss literature, exchange books, and explore new genres together',
      color: '#edb04c',
      tags: ['Reading', 'Discussions', 'Exchange']
    },
    {
      id: 'music',
      emoji: '🎸',
      title: 'Music Groups',
      description: 'Join jam sessions, create Spotify blends, and discover new sounds',
      color: '#a477ab',
      tags: ['Jam Sessions', 'Playlists', 'Concerts']
    },
    {
      id: 'gaming',
      emoji: '🎮',
      title: 'Gaming Squads',
      description: 'Find teammates for casual fun or competitive play across platforms',
      color: '#c36376',
      tags: ['Multiplayer', 'eSports', 'Tournaments']
    },
    {
      id: 'anime',
      emoji: '🎭',
      title: 'Anime & Movie Nights',
      description: 'Watch together, discuss plots, and enjoy themed events with friends',
      color: '#edb04c',
      tags: ['Watch Parties', 'Discussions', 'Themes']
    }
  ];

  return (
    <section id="hobbies" className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-[#a477ab]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#edb04c]/5 blur-3xl"></div>
        <div className="absolute top-40 left-1/3 w-72 h-72 rounded-full bg-[#c36376]/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Shared <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">Hobbies</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your tribe based on common interests. Join existing communities or create your own to connect over shared passions.
          </p>
        </motion.div>
        
        {/* Dynamic Hobby Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbyCategories.map((category, index) => (
            <DynamicHobbyCard 
              key={category.id} 
              category={category} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Explore All Button */}
        <div className="mt-16 text-center">
          <motion.button
            className="px-8 py-4 rounded-full shadow-sm font-medium mx-auto bg-white relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient border */}
            <span className="absolute inset-0 rounded-full z-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, #a477ab, #c36376, #edb04c, #c36376, #a477ab)",
                  backgroundSize: "300% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 8,
                  ease: "linear"
                }}
              />
            </span>
            
            {/* White background for text */}
            <span className="absolute inset-[2px] bg-white rounded-full z-10"></span>
            
            {/* Button text */}
            <span className="relative z-20 flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">
                Explore All Categories
              </span>
              <FiArrowRight className="text-[#c36376]" />
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Dynamic Hobby Card Component with enhanced hover effects but no button
const DynamicHobbyCard = ({ category, index }) => {
  return (
    <motion.a 
      href={`#${category.id}`}
      className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full relative no-underline cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
    >
      {/* Animated background effect on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${category.color}20 0%, transparent 70%)`,
        }}
      />
      
      {/* Animated border effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300"
        animate={{
          boxShadow: `inset 0 0 0 2px ${category.color}50`
        }}
      />
      
      {/* Card Header with Animated Emoji */}
      <div className="p-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"
          style={{ 
            background: `radial-gradient(circle at center, ${category.color}40 0%, transparent 70%)`,
            transform: "translate(30%, -30%)"
          }}
        />
        
        {/* Large emoji with animated backdrop */}
        <div className="relative z-10">
          <motion.div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`
            }}
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {/* Dynamic emoji with hover animation */}
            <motion.span 
              className="text-4xl"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {category.emoji}
            </motion.span>
          </motion.div>
          
          {/* Category title with hover effect */}
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-2xl mb-1 group-hover:text-[#333] transition-colors duration-300">
              {category.title}
            </h3>
            
            {/* Arrow that appears on hover */}
            <motion.span 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <FiArrowRight style={{ color: category.color }} />
            </motion.span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-gray-600 mb-6 flex-grow group-hover:text-gray-700 transition-colors duration-300">
          {category.description}
        </p>
        
        {/* Tags with hover animation */}
        <div className="flex flex-wrap gap-2">
          {category.tags.map((tag, i) => (
            <motion.span 
              key={i} 
              className="px-3 py-1 rounded-full text-sm transition-colors duration-300"
              style={{ 
                backgroundColor: `${category.color}15`,
                color: category.color
              }}
              whileHover={{
                backgroundColor: `${category.color}30`,
                scale: 1.05
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default Hobbies;