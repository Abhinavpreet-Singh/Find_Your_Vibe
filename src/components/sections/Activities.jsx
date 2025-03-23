import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiCheck, FiArrowRight } from 'react-icons/fi';

const Activities = () => {
  const [activeTab, setActiveTab] = useState('join');
  
  // Current time (not displayed, just for reference)
  const currentTime = "2025-03-23 13:20:48";
  
  // Sample upcoming activities
  const upcomingActivities = [
    {
      id: 1,
      title: "Web Dev Hackathon Prep",
      type: "Tech",
      mode: "Local",
      location: "San Francisco Tech Hub",
      date: "Apr 15",
      time: "6:00 PM",
      spots: "3 spots left",
      host: "Alex M.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Coding", "Web", "Team"]
    },
    {
      id: 2,
      title: "Sunday Badminton Match",
      type: "Sports",
      mode: "Local",
      location: "Central Park Courts",
      date: "Apr 12",
      time: "10:00 AM",
      spots: "2 spots left",
      host: "Sarah L.",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Badminton", "Beginner", "Weekend"]
    },
    {
      id: 3,
      title: "Book Club: Sci-Fi Novels",
      type: "Books",
      mode: "Online",
      location: "Zoom Meeting",
      date: "Apr 18",
      time: "7:30 PM",
      spots: "Unlimited spots",
      host: "Jamie K.",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Reading", "SciFi", "Discussion"]
    },
    {
      id: 4,
      title: "Indie Music Jam Session",
      type: "Music",
      mode: "Local",
      location: "Echo Music Studio",
      date: "Apr 20",
      time: "8:00 PM",
      spots: "4 spots left",
      host: "Miguel R.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Music", "Jam", "Indie"]
    },
    {
      id: 5,
      title: "Valorant Tournament Team",
      type: "Gaming",
      mode: "Online",
      location: "Discord Server",
      date: "Apr 14",
      time: "9:00 PM",
      spots: "1 spot left",
      host: "Priya T.",
      image: "https://images.unsplash.com/photo-1553406772-4156d8c4f4db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Gaming", "Valorant", "Tournament"]
    },
    {
      id: 6,
      title: "Studio Ghibli Film Night",
      type: "Anime",
      mode: "Online",
      location: "Netflix Party",
      date: "Apr 22",
      time: "5:30 PM",
      spots: "8 spots left",
      host: "Kenji W.",
      image: "https://images.unsplash.com/photo-1614846484158-379b193673c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Anime", "Movies", "Social"]
    }
  ];

  return (
    <section id="activities" className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-[#a477ab]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#edb04c]/5 blur-3xl"></div>
        <div className="absolute top-40 left-1/3 w-72 h-72 rounded-full bg-[#c36376]/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Take the Lead or <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]">Join the Fun!</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Host your own events or find existing groups to collaborate, play, and grow together.
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full p-1 shadow-md flex">
            <motion.button
              className={`px-6 py-3 rounded-full font-medium text-base transition-all ${
                activeTab === 'join' 
                ? 'bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white shadow-md' 
                : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('join')}
              whileTap={{ scale: 0.98 }}
            >
              Join Activities
            </motion.button>
            <motion.button
              className={`px-6 py-3 rounded-full font-medium text-base transition-all ${
                activeTab === 'host' 
                ? 'bg-gradient-to-r from-[#c36376] to-[#edb04c] text-white shadow-md' 
                : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('host')}
              whileTap={{ scale: 0.98 }}
            >
              Host an Activity
            </motion.button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {/* Join Activities Tab */}
          {activeTab === 'join' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingActivities.map((activity, index) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    index={index} 
                  />
                ))}
              </div>
              
              {/* View More Button - with consistent styling */}
              <div className="text-center mt-10">
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
                      Explore All Activities
                    </span>
                    <FiArrowRight className="text-[#c36376]" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Host an Activity Tab */}
          {activeTab === 'host' && (
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Visual Illustration of Hosting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Description */}
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <h3 className="font-bold text-2xl mb-4">Create Your Own Activities</h3>
                  <p className="text-gray-600 mb-6">Share your passions by hosting activities and connecting with like-minded individuals.</p>
                  
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="mr-4 w-7 h-7 rounded-full bg-[#a477ab]/20 text-[#a477ab] flex items-center justify-center flex-shrink-0">
                        <FiCheck />
                      </div>
                      <div>
                        <p className="font-medium">Host Public or Private Events</p>
                        <p className="text-gray-500 text-sm">Open to everyone or just invite specific people</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 w-7 h-7 rounded-full bg-[#c36376]/20 text-[#c36376] flex items-center justify-center flex-shrink-0">
                        <FiCheck />
                      </div>
                      <div>
                        <p className="font-medium">Choose Local or Online</p>
                        <p className="text-gray-500 text-sm">Meet in person or connect virtually</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 w-7 h-7 rounded-full bg-[#edb04c]/20 text-[#edb04c] flex items-center justify-center flex-shrink-0">
                        <FiCheck />
                      </div>
                      <div>
                        <p className="font-medium">Set Schedules & Send Updates</p>
                        <p className="text-gray-500 text-sm">One-time events or recurring gatherings</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-4 w-7 h-7 rounded-full bg-[#a477ab]/20 text-[#a477ab] flex items-center justify-center flex-shrink-0">
                        <FiCheck />
                      </div>
                      <div>
                        <p className="font-medium">Manage Attendees & Engagement</p>
                        <p className="text-gray-500 text-sm">Accept requests and communicate with participants</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Right Column - Example Activities */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)' }}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Weekly Coding Meetup</h4>
                        <span className="px-2.5 py-1 rounded-full text-xs bg-[#a477ab]/20 text-[#a477ab] font-medium">Local</span>
                      </div>
                      <p className="text-gray-600 text-sm">Share projects, practice coding challenges, and learn from each other.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)' }}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Weekend Hiking Group</h4>
                        <span className="px-2.5 py-1 rounded-full text-xs bg-[#c36376]/20 text-[#c36376] font-medium">Local</span>
                      </div>
                      <p className="text-gray-600 text-sm">Explore local trails together with fellow nature enthusiasts.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)' }}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Virtual Game Night</h4>
                        <span className="px-2.5 py-1 rounded-full text-xs bg-[#edb04c]/20 text-[#edb04c] font-medium">Online</span>
                      </div>
                      <p className="text-gray-600 text-sm">Play multiplayer games and make new friends online.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Single Button for Host Tab - matches other buttons */}
              <div className="mt-10 text-center">
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
                      Create an Activity
                    </span>
                    <FiArrowRight className="text-[#c36376]" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

// Activity Card Component
const ActivityCard = ({ activity, index }) => {
  // Colors for different activity types
  const typeColors = {
    'Tech': '#a477ab',
    'Sports': '#c36376',
    'Books': '#edb04c',
    'Music': '#a477ab',
    'Gaming': '#c36376',
    'Anime': '#edb04c'
  };
  
  const color = typeColors[activity.type] || '#a477ab';
  
  return (
    <motion.div 
      className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -6,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Activity Image with Overlay on Hover */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" 
          style={{ backgroundImage: `url(${activity.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Animated Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`,
            mixBlendMode: "overlay"
          }}
        ></div>
        
        {/* Activity Type Badge */}
        <div className="absolute top-4 left-4">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: color }}
          >
            {activity.type}
          </span>
        </div>
        
        {/* Mode Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-900">
            {activity.mode}
          </span>
        </div>
        
        {/* Title and Date */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-white/90 transition-colors duration-300">{activity.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <FiCalendar size={14} className="mr-1" />
            <span>{activity.date} · {activity.time}</span>
          </div>
        </div>
      </div>
      
      {/* Activity Details */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Location */}
        <div className="flex items-start mb-4">
          <FiMapPin size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700 text-sm">{activity.location}</p>
        </div>
        
        {/* Spots and Host Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FiUsers size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{activity.spots}</span>
          </div>
          <div className="text-sm text-gray-600">
            By <span className="font-medium">{activity.host}</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {activity.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Single Button with consistent styling */}
      <div className="px-5 pb-5">
        <motion.button
          className="w-full py-2.5 rounded-lg relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated gradient border */}
          <span className="absolute inset-0 rounded-lg z-0 overflow-hidden">
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
          <span className="absolute inset-[1.5px] bg-white rounded-lg z-10"></span>
          
          {/* Button text */}
          <span className="relative z-20 flex justify-center items-center gap-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c] font-medium">
              Join Activity
            </span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Activities;