import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiUsers, FiCalendar } from "react-icons/fi";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const Groups = () => {
  const { currentUser } = useAuth();
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Groups categories - same as in the homepage Hobbies component
  const groupCategories = [
    {
      id: 'arts',
      emoji: '🎨',
      title: 'Arts & Craft',
      description: 'Unleash creativity with painting, DIY projects, and crafting sessions',
      color: '#a477ab',
      tags: ['Creativity', 'DIY', 'Workshops'],
      members: 124,
      upcomingEvents: 3
    },
    {
      id: 'sports',
      emoji: '🏸',
      title: 'Sports & Fitness',
      description: 'Find gym partners, play badminton, football, and stay active together',
      color: '#c36376',
      tags: ['Active', 'Team Sports', 'Training'],
      members: 205,
      upcomingEvents: 7
    },
    {
      id: 'books',
      emoji: '📚',
      title: 'Book Clubs',
      description: 'Discuss literature, exchange books, and explore new genres together',
      color: '#edb04c',
      tags: ['Reading', 'Discussions', 'Exchange'],
      members: 87,
      upcomingEvents: 2
    },
    {
      id: 'music',
      emoji: '🎸',
      title: 'Music Groups',
      description: 'Join jam sessions, create Spotify blends, and discover new sounds',
      color: '#a477ab',
      tags: ['Jam Sessions', 'Playlists', 'Concerts'],
      members: 156,
      upcomingEvents: 5
    },
    {
      id: 'gaming',
      emoji: '🎮',
      title: 'Gaming Squads',
      description: 'Find teammates for casual fun or competitive play across platforms',
      color: '#c36376',
      tags: ['Multiplayer', 'eSports', 'Tournaments'],
      members: 238,
      upcomingEvents: 4
    },
    {
      id: 'anime',
      emoji: '🎭',
      title: 'Anime & Movie Nights',
      description: 'Watch together, discuss plots, and enjoy themed events with friends',
      color: '#edb04c',
      tags: ['Watch Parties', 'Discussions', 'Themes'],
      members: 113,
      upcomingEvents: 3
    }
  ];

  // Simulating fetching user's joined groups
  useEffect(() => {
    const fetchUserGroups = async () => {
      setLoading(true);
      try {
        // This would be replaced with actual API call to Firebase
        // For now, we'll just simulate with random joined groups
        setTimeout(() => {
          const randomJoined = groupCategories
            .filter(() => Math.random() > 0.5)
            .map(group => group.id);
          setJoinedGroups(randomJoined);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching user groups:", error);
        setLoading(false);
      }
    };

    fetchUserGroups();
  }, []);

  // Handle joining/leaving a group
  const handleGroupToggle = (groupId) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(prev => prev.filter(id => id !== groupId));
    } else {
      setJoinedGroups(prev => [...prev, groupId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Interest Groups
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with like-minded people by joining groups based on your interests
          </p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupCategories.map((group, index) => (
              <GroupCard 
                key={group.id}
                group={group}
                index={index}
                isJoined={joinedGroups.includes(group.id)}
                onToggle={() => handleGroupToggle(group.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Group Card Component
const GroupCard = ({ group, index, isJoined, onToggle }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Card Header with Color Bar */}
      <div 
        className="h-2 w-full"
        style={{ backgroundColor: group.color }}
      ></div>
      
      <div className="p-6">
        {/* Group Header with Emoji */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-3 text-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${group.color}30, ${group.color}10)`
              }}
            >
              {group.emoji}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{group.title}</h3>
          </div>
          
          <button
            onClick={onToggle}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all focus:outline-none ${
              isJoined 
                ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isJoined ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <FiPlus className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Group Description */}
        <p className="text-gray-600 mb-4">
          {group.description}
        </p>
        
        {/* Group Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <FiUsers className="mr-1" />
            <span>{group.members} members</span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="mr-1" />
            <span>{group.upcomingEvents} events</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {group.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${group.color}15`,
                color: group.color
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Join/Joined Status */}
        <div className={`mt-4 text-sm ${isJoined ? 'text-green-600' : 'text-gray-500'}`}>
          {isJoined ? 'You\'ve joined this group' : 'Join to connect with members'}
        </div>
      </div>
    </motion.div>
  );
};

export default Groups;