import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FiActivity, FiClock, FiHeart, FiAward, FiCalendar, FiUsers, FiSettings } from 'react-icons/fi';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [stats, setStats] = useState({
    activitiesCompleted: 0,
    hoursSpent: 0,
    favoritesAdded: 0,
    achievements: 0
  });
  
  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would normally be a fetch from your database
      setStats({
        activitiesCompleted: 12,
        hoursSpent: 24,
        favoritesAdded: 7,
        achievements: 3
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <Navbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Welcome Section with User */}
        <motion.div 
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a477ab] to-[#c36376]">
                  {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Friend'}
                </span>
              </h1>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <motion.div 
              className="relative flex shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="Profile" 
                  className="h-16 w-16 rounded-full border-2 border-pink-300"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white text-xl font-bold">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <StatsCard 
            icon={<FiActivity className="text-[#a477ab]" />}
            title="Activities Completed"
            value={stats.activitiesCompleted}
            bgColor="bg-purple-50"
            textColor="text-[#a477ab]"
          />
          <StatsCard 
            icon={<FiClock className="text-[#c36376]" />}
            title="Hours Spent"
            value={stats.hoursSpent}
            bgColor="bg-pink-50"
            textColor="text-[#c36376]"
          />
          <StatsCard 
            icon={<FiHeart className="text-orange-500" />}
            title="Favorites Added"
            value={stats.favoritesAdded}
            bgColor="bg-orange-50"
            textColor="text-orange-500"
          />
          <StatsCard 
            icon={<FiAward className="text-yellow-500" />}
            title="Achievements"
            value={stats.achievements}
            bgColor="bg-yellow-50"
            textColor="text-yellow-500"
          />
        </motion.div>
        
        {/* Dashboard Content Tabs */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
            <TabButton 
              active={selectedTab === 'overview'} 
              onClick={() => setSelectedTab('overview')}
              icon={<FiActivity />}
              label="Overview"
            />
            <TabButton 
              active={selectedTab === 'calendar'} 
              onClick={() => setSelectedTab('calendar')}
              icon={<FiCalendar />}
              label="Calendar"
            />
            <TabButton 
              active={selectedTab === 'community'} 
              onClick={() => setSelectedTab('community')}
              icon={<FiUsers />}
              label="Community"
            />
            <TabButton 
              active={selectedTab === 'settings'} 
              onClick={() => setSelectedTab('settings')}
              icon={<FiSettings />}
              label="Settings"
            />
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Your Activity Overview</h2>
                <p className="text-gray-600">
                  Welcome to your dashboard! This is where you can track your progress,
                  discover new activities, and connect with the community. Start by exploring
                  some new activities or check your upcoming events.
                </p>
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-[#a477ab]">Ready to find your next vibe?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Try our personalized activity recommendations based on your preferences.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-full text-sm font-medium hover:opacity-90 transition">
                    Explore Activities
                  </button>
                </div>
              </div>
            )}
            
            {selectedTab === 'calendar' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Your Calendar</h2>
                <p className="text-gray-600">
                  Schedule and track your activities here. Calendar view coming soon!
                </p>
              </div>
            )}
            
            {selectedTab === 'community' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Community</h2>
                <p className="text-gray-600">
                  Connect with others who share your interests. Community features coming soon!
                </p>
              </div>
            )}
            
            {selectedTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Account Settings</h2>
                <p className="text-gray-600">
                  Manage your profile and preferences here. Settings page coming soon!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value, bgColor, textColor }) => {
  return (
    <motion.div 
      className={`${bgColor} rounded-xl p-5 shadow`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-white mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <p className={`${textColor} text-2xl font-bold`}>{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`px-6 py-4 flex items-center whitespace-nowrap transition-colors ${
        active 
          ? 'text-[#a477ab] border-b-2 border-[#a477ab] font-medium' 
          : 'text-gray-600 hover:text-[#a477ab]'
      }`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default Dashboard;