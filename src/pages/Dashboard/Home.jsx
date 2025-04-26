import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { FiActivity, FiClock, FiHeart, FiAward, FiCalendar, FiUsers, FiSettings, 
  FiGlobe, FiLock, FiUserPlus, FiFilter, FiPlus, FiBell, FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('sessions');
  const [stats, setStats] = useState({
    activeSessions: 0,
    collaborationsThisMonth: 0,
    pendingInvites: 0
  });
  
  // Mock user data
  const [userData, setUserData] = useState({
    vibeTags: ['🎵 Music', '⚽ Sports', '💻 Coding'],
  });

  // Mock sessions data
  const [ongoingSessions, setOngoingSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  
  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would normally be a fetch from your database
      setStats({
        activeSessions: 10,
        collaborationsThisMonth: 150,
        pendingInvites: 3
      });

      // Set mock ongoing sessions
      setOngoingSessions([
        {
          id: 1,
          name: "Basketball Match",
          host: {
            name: "Mike Johnson",
            avatar: "https://i.pravatar.cc/150?img=11"
          },
          time: "Now (Started 30m ago)",
          participants: 8,
          tags: ["Sports", "Basketball"],
          visibility: "public"
        },
        {
          id: 2,
          name: "Jazz Jam Session",
          host: {
            name: "Sarah Davis",
            avatar: "https://i.pravatar.cc/150?img=5"
          },
          time: "Now (Started 15m ago)",
          participants: 4,
          tags: ["Music", "Jazz"],
          visibility: "connections"
        }
      ]);

      // Set mock upcoming sessions
      setUpcomingSessions([
        {
          id: 3,
          name: "React Study Group",
          host: {
            name: "Alex Chen",
            avatar: "https://i.pravatar.cc/150?img=3"
          },
          time: "Today, 7:00 PM",
          participants: 5,
          tags: ["Study", "Coding"],
          visibility: "public"
        },
        {
          id: 4,
          name: "Volleyball Practice",
          host: {
            name: "Emma Wilson",
            avatar: "https://i.pravatar.cc/150?img=9"
          },
          time: "Tomorrow, 5:30 PM",
          participants: 10,
          tags: ["Sports", "Volleyball"],
          visibility: "connections"
        },
        {
          id: 5,
          name: "Book Club: Sci-Fi Novels",
          host: {
            name: "David Parker",
            avatar: "https://i.pravatar.cc/150?img=12"
          },
          time: "Wed, 6:00 PM",
          participants: 6,
          tags: ["Books", "Discussion"],
          visibility: "public"
        }
      ]);

      // Set mock suggested connections
      setSuggestedConnections([
        {
          id: 101,
          name: "Priya Sharma",
          avatar: "https://i.pravatar.cc/150?img=25",
          interests: ["Music", "Coding"],
          bio: "Full-stack dev & guitar enthusiast"
        },
        {
          id: 102,
          name: "Mark Zhang",
          avatar: "https://i.pravatar.cc/150?img=15",
          interests: ["Sports", "Photography"],
          bio: "Sports photographer & basketball player"
        },
        {
          id: 103,
          name: "Olivia Kim",
          avatar: "https://i.pravatar.cc/150?img=29",
          interests: ["Books", "Music"],
          bio: "Classical pianist & book lover"
        },
        {
          id: 104,
          name: "Raj Patel",
          avatar: "https://i.pravatar.cc/150?img=18",
          interests: ["Coding", "Gaming"],
          bio: "Game developer & esports fan"
        }
      ]);

      // Set mock external events
      setExternalEvents([
        {
          id: 201,
          title: "Campus Hackathon",
          platform: "Devfolio",
          logo: "https://i.pravatar.cc/150?img=50",
          link: "#"
        },
        {
          id: 202,
          title: "Open Jam Night",
          platform: "MusicMates",
          logo: "https://i.pravatar.cc/150?img=51",
          link: "#"
        },
        {
          id: 203,
          title: "Community Basketball",
          platform: "SportMatch",
          logo: "https://i.pravatar.cc/150?img=52",
          link: "#"
        },
        {
          id: 204,
          title: "Tech Conference",
          platform: "Eventix",
          logo: "https://i.pravatar.cc/150?img=53",
          link: "#"
        }
      ]);

      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <DashboardNavbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* 1. Welcome Banner with Personalized Greeting */}
        <motion.div 
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* User Avatar */}
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
              
              {/* Greeting and Vibe Tagline */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a477ab] to-[#c36376]">
                    {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Friend'}
                  </span>! Ready to find your vibe today?
                </h1>
                <p className="text-gray-600 text-lg">
                  Collaborate, Jam, Compete, Learn — Dive into your passions!
                </p>
                {/* Vibe Tags */}
                <div className="flex flex-wrap mt-2 gap-2">
                  {userData.vibeTags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                  <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition flex items-center">
                    <FiPlus size={14} className="mr-1" /> Add more
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="bg-purple-50 rounded-xl p-3 flex items-center">
                <div className="p-2 rounded-lg bg-white mr-2 text-[#a477ab]">
                  <FiBell />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Invites</p>
                  <p className="text-[#a477ab] font-bold">{stats.pendingInvites}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Main Dashboard Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar: Quick Actions Panel */}
          <motion.div
            className="lg:w-1/4 bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Host New Session Button */}
              <button className="w-full py-3 px-4 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-xl font-medium hover:opacity-90 transition flex items-center justify-center">
                <FiPlus className="mr-2" /> Host a New Session
              </button>
              
              {/* Browse Categories */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Browse Vibes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 px-3 bg-purple-50 text-[#a477ab] rounded-lg font-medium text-sm hover:bg-purple-100 transition flex items-center justify-center">
                    <FiActivity className="mr-1.5" /> Study
                  </button>
                  <button className="py-2 px-3 bg-pink-50 text-[#c36376] rounded-lg font-medium text-sm hover:bg-pink-100 transition flex items-center justify-center">
                    <FiActivity className="mr-1.5" /> Music
                  </button>
                  <button className="py-2 px-3 bg-orange-50 text-orange-500 rounded-lg font-medium text-sm hover:bg-orange-100 transition flex items-center justify-center">
                    <FiActivity className="mr-1.5" /> Sports
                  </button>
                  <button className="py-2 px-3 bg-yellow-50 text-yellow-500 rounded-lg font-medium text-sm hover:bg-yellow-100 transition flex items-center justify-center">
                    <FiActivity className="mr-1.5" /> Gaming
                  </button>
                </div>
              </div>
              
              {/* View Invites */}
              <div className="pt-3 border-t border-gray-100">
                <button className="w-full py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center">
                  <FiBell className="mr-2" /> 
                  View Invites 
                  {stats.pendingInvites > 0 && <span className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{stats.pendingInvites}</span>}
                </button>
              </div>
            </div>
            
            {/* Collaboration Stats */}
            <div className="p-5 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Active sessions</span>
                  <span className="font-bold text-[#a477ab]">{stats.activeSessions}</span>
                </div>
                <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#a477ab] to-[#c36376] rounded-full" style={{ width: `${Math.min(100, stats.activeSessions * 5)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">This month's collabs</span>
                  <span className="font-bold text-[#c36376]">{stats.collaborationsThisMonth}</span>
                </div>
                <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#c36376] to-[#edb04c] rounded-full" style={{ width: `${Math.min(100, stats.collaborationsThisMonth / 2)}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Main Content: Session Feed */}
          <motion.div 
            className="lg:w-2/4 bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <TabButton 
                active={selectedTab === 'sessions'} 
                onClick={() => setSelectedTab('sessions')}
                icon={<FiActivity />}
                label="Sessions"
              />
              <TabButton 
                active={selectedTab === 'discover'} 
                onClick={() => setSelectedTab('discover')}
                icon={<FiGlobe />}
                label="Discover"
              />
              <TabButton 
                active={selectedTab === 'my-activities'} 
                onClick={() => setSelectedTab('my-activities')}
                icon={<FiCalendar />}
                label="My Activities"
              />
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {selectedTab === 'sessions' && (
                <div className="space-y-6">
                  {/* Filter Bar */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Session Feed</h2>
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 flex items-center text-sm hover:bg-gray-50 transition">
                      <FiFilter className="mr-2" /> Filter
                    </button>
                  </div>
                  
                  {/* Ongoing Sessions */}
                  <div>
                    <div className="mb-3 flex items-center">
                      <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                      <h3 className="font-medium text-gray-800">Happening Now</h3>
                    </div>
                    
                    {ongoingSessions.length > 0 ? (
                      <div className="space-y-3">
                        {ongoingSessions.map(session => (
                          <SessionCard key={session.id} session={session} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No ongoing sessions at the moment.</p>
                    )}
                  </div>
                  
                  {/* Upcoming Sessions */}
                  <div>
                    <div className="mb-3 flex items-center">
                      <span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
                      <h3 className="font-medium text-gray-800">Upcoming</h3>
                    </div>
                    
                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingSessions.map(session => (
                          <SessionCard key={session.id} session={session} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No upcoming sessions scheduled.</p>
                    )}
                  </div>
                </div>
              )}
              
              {selectedTab === 'discover' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Discover Sessions</h2>
                  <p className="text-gray-600">
                    Find new sessions to join based on your interests. Coming soon!
                  </p>
                </div>
              )}
              
              {selectedTab === 'my-activities' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">My Activities</h2>
                  <p className="text-gray-600">
                    View and manage sessions you've joined or created. Coming soon!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Right Sidebar: Suggestions & Events */}
          <motion.div 
            className="lg:w-1/4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Suggested Connections */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">Suggested Connections</h2>
              </div>
              <div className="p-3 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {suggestedConnections.map(connection => (
                    <ConnectionCard key={connection.id} connection={connection} />
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <button className="w-full py-2 px-4 text-[#c36376] border border-[#c36376] rounded-lg text-sm font-medium hover:bg-pink-50 transition">
                  View All Suggestions
                </button>
              </div>
            </div>
            
            {/* External Collab Events */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">External Events</h2>
              </div>
              <div className="p-3">
                {externalEvents.map(event => (
                  <div key={event.id} className="p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden mr-3 flex-shrink-0">
                        <img src={event.logo} alt={event.platform} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800 truncate">{event.title}</p>
                        <p className="text-xs text-gray-500">via {event.platform}</p>
                      </div>
                      <a href={event.link} className="text-[#a477ab] text-sm hover:underline">
                        Know More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Session Card Component
const SessionCard = ({ session }) => {
  const bgColor = session.visibility === "public" ? "bg-blue-50" : 
                  session.visibility === "connections" ? "bg-purple-50" : "bg-gray-50";
  const textColor = session.visibility === "public" ? "text-blue-600" : 
                    session.visibility === "connections" ? "text-purple-600" : "text-gray-600";
  const icon = session.visibility === "public" ? <FiGlobe /> : <FiLock />;
  
  return (
    <motion.div 
      className={`${bgColor} rounded-xl p-4 hover:shadow-md transition border border-gray-100`}
      whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-start">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img src={session.host.avatar} alt={session.host.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">{session.name}</h3>
            <div className={`flex items-center ${textColor} text-xs font-medium`}>
              {icon}
              <span className="ml-1">{session.visibility === "connections" ? "Connections" : "Public"}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Hosted by {session.host.name}</p>
          <div className="flex flex-wrap mt-2 gap-2">
            {session.tags.map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-white text-gray-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <FiClock className="mr-1" />
              <span>{session.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FiUsers className="mr-1" />
              <span>{session.participants} joined</span>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="px-3 py-1.5 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white text-sm font-medium rounded-lg hover:opacity-90 transition flex items-center">
              <FiSend className="mr-1.5" /> Join Request
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Connection Card Component
const ConnectionCard = ({ connection }) => {
  return (
    <div className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition">
      <div className="mr-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={connection.avatar} alt={connection.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{connection.name}</h3>
        <p className="text-xs text-gray-500 truncate max-w-[150px]">{connection.bio}</p>
        <div className="flex flex-wrap mt-1 gap-1">
          {connection.interests.map((interest, index) => (
            <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
              {interest}
            </span>
          ))}
        </div>
      </div>
      <button className="ml-2 p-1.5 bg-[#a477ab]/10 text-[#a477ab] rounded-md hover:bg-[#a477ab]/20 transition">
        <FiUserPlus size={16} />
      </button>
    </div>
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

export default Home;