import { motion } from 'framer-motion';
import { FiMusic, FiFilter, FiSearch, FiHeadphones } from 'react-icons/fi';

const Music = () => {
  const genres = [
    "Rock", "Jazz", "EDM", "Hip-Hop", "Classical", "Folk", "Pop", "Metal"
  ];
  
  const musicians = [
    {
      name: "Alex J.",
      instrument: "Guitar",
      genres: ["Rock", "Blues"],
      lookingFor: "Drummer",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sophia W.",
      instrument: "Vocals",
      genres: ["Jazz", "Soul"],
      lookingFor: "Pianist",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Ethan M.",
      instrument: "Producer",
      genres: ["EDM", "House"],
      lookingFor: "Vocalist",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      name: "Michael R.",
      instrument: "Drums",
      genres: ["Rock", "Metal"],
      lookingFor: "Bassist",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      name: "Ava K.",
      instrument: "Violin",
      genres: ["Classical", "Folk"],
      lookingFor: "Cellist",
      image: "https://randomuser.me/api/portraits/women/17.jpg"
    },
    {
      name: "Noah P.",
      instrument: "Bass",
      genres: ["Funk", "Jazz"],
      lookingFor: "Saxophonist",
      image: "https://randomuser.me/api/portraits/men/19.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="music" className="py-16 px-4 md:px-6 lg:px-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your <span className="gradient-text">Jam</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with musicians, form bands, and collaborate on tracks that move the world.
          </p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div 
          className="mb-10 flex flex-col md:flex-row gap-4 justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search musicians..."
              className="pl-10 pr-4 py-3 w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-purple dark:focus:ring-primary-gold"
            />
          </div>
          
          {/* Filter Dropdown */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <FiFilter />
              <span>Filter by Genre</span>
            </button>
          </motion.div>
        </motion.div>
        
        {/* Genres */}
        <motion.div 
          className="flex gap-3 flex-wrap mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {genres.map((genre, index) => (
            <motion.button
              key={index}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary-purple dark:hover:border-primary-gold transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Musicians Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {musicians.map((musician, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={musician.image} 
                  alt={musician.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{musician.name}</h3>
                  <p className="text-white/80">{musician.instrument}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 mb-3">
                  {musician.genres.map((genre, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-primary-purple/10 dark:bg-primary-purple/20 text-primary-purple dark:text-primary-gold text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <FiHeadphones />
                    <span>Looking for: {musician.lookingFor}</span>
                  </div>
                  <motion.button
                    className="text-primary-purple dark:text-primary-gold text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Spotify Integration Teaser */}
        <motion.div 
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary-purple/10 to-primary-red/10 dark:from-primary-purple/20 dark:to-primary-red/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-3">Coming Soon: Spotify Integration</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Find music collaborators based on your musical taste and listening habits.
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Waitlist
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;