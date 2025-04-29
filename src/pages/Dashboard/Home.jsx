import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../components/Loader';
import { 
  FiActivity, FiClock, FiCalendar, FiUsers, FiGlobe, FiLock, 
  FiUserPlus, FiFilter, FiPlus, FiBell, FiSend, FiTrendingUp,
  FiStar, FiBookmark, FiTag, FiMapPin, FiLayers, FiMessageCircle
} from 'react-icons/fi';

const Home = () => {
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data states
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [matchedVibes, setMatchedVibes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [trendingVibes, setTrendingVibes] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock data for upcoming sessions
      setUpcomingSessions([
        {
          id: 3,
          name: "React Study Group",
          host: {
            name: "Alex Chen",
            avatar: "https://i.pravatar.cc/150?img=3"
          },
          time: "Today, 7:00 PM",
          location: "Virtual",
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
          location: "Riverside Park",
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
          location: "Virtual",
          participants: 6,
          tags: ["Books", "Discussion"],
          visibility: "public"
        }
      ]);

      // Mock matched vibes
      setMatchedVibes([
        {
          id: 201,
          name: "Guitar Jam Sessions",
          members: 32,
          matchScore: 95,
          icon: "🎸",
          categories: ["Music", "Performing Arts"],
          description: "Weekly jam sessions for guitar enthusiasts of all levels"
        },
        {
          id: 202,
          name: "Tech Startup Network",
          members: 48,
          matchScore: 88,
          icon: "💻",
          categories: ["Technology", "Business"],
          description: "Connect with fellow entrepreneurs and tech visionaries"
        },
        {
          id: 203,
          name: "Urban Photography",
          members: 27,
          matchScore: 82,
          icon: "📷",
          categories: ["Photography", "Arts"],
          description: "Capture city life through your unique lens"
        }
      ]);

      // Mock suggested connections
      setSuggestedConnections([
        {
          id: 101,
          name: "Priya Sharma",
          avatar: "https://i.pravatar.cc/150?img=25",
          title: "Full-stack Developer",
          interests: ["Music", "Coding"],
          connectionStrength: 4,
          mutualConnections: 3
        },
        {
          id: 102,
          name: "Mark Zhang",
          avatar: "https://i.pravatar.cc/150?img=15",
          title: "Sports Photographer",
          interests: ["Sports", "Photography"],
          connectionStrength: 3,
          mutualConnections: 2
        },
        {
          id: 103,
          name: "Olivia Kim",
          avatar: "https://i.pravatar.cc/150?img=29",
          title: "Classical Musician",
          interests: ["Books", "Music"],
          connectionStrength: 5,
          mutualConnections: 4
        }
      ]);

      // Mock notifications
      setNotifications([
        {
          id: 301,
          type: "invitation",
          content: "Hiking Adventure Group invited you to join",
          time: "2h ago",
          read: false
        },
        {
          id: 302,
          type: "connection",
          content: "Jamie Rivera accepted your connection request",
          time: "5h ago",
          read: false
        },
        {
          id: 303,
          type: "event",
          content: "Your \"Film Discussion\" event starts in 3 hours",
          time: "1d ago",
          read: true
        }
      ]);

      // Set trending vibes
      setTrendingVibes([
        { id: 1, name: "Urban Sketching", growth: "+28%" },
        { id: 2, name: "Tech Meetups", growth: "+23%" },
        { id: 3, name: "Foodie Adventures", growth: "+19%" },
        { id: 4, name: "Language Exchange", growth: "+15%" },
        { id: 5, name: "Sustainable Living", growth: "+12%" }
      ]);

      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-pink-50 via-white to-orange-50'}`}>
      <DashboardNavbar />
      
      <div className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
        {/* Main Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile & Quick Links */}
          <div className="space-y-6">
            {/* Profile Summary Card */}
            <ProfileSummaryCard isDarkMode={isDarkMode} currentUser={currentUser} />
            
            {/* Quick Links */}
            <QuickLinksCard isDarkMode={isDarkMode} notificationsCount={notifications.filter(n => !n.read).length} />
            
            {/* Trending Vibes */}
            <TrendingVibesCard isDarkMode={isDarkMode} trendingVibes={trendingVibes} />
          </div>
          
          {/* Middle Column - Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Navigation Tabs with gradient border */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
              </div>
              <div className={`relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl flex overflow-hidden`}>
                <TabButton 
                  label="Upcoming" 
                  icon={<FiCalendar />} 
                  active={activeTab === 'upcoming'} 
                  onClick={() => setActiveTab('upcoming')}
                  isDarkMode={isDarkMode} 
                />
                <TabButton 
                  label="For You" 
                  icon={<FiStar />} 
                  active={activeTab === 'foryou'} 
                  onClick={() => setActiveTab('foryou')}
                  isDarkMode={isDarkMode} 
                />
                <TabButton 
                  label="Saved" 
                  icon={<FiBookmark />} 
                  active={activeTab === 'saved'} 
                  onClick={() => setActiveTab('saved')}
                  isDarkMode={isDarkMode} 
                />
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
              {/* Gradient border */}
              <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
              </div>
              <div className={`relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5`}>
                {activeTab === 'upcoming' && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                        Upcoming Sessions
                      </h2>
                      <Link to="/dashboard/events" className="flex items-center text-sm font-medium text-[#c36376] hover:text-[#a477ab]">
                        View All <FiCalendar className="ml-1" />
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {upcomingSessions.length > 0 ? (
                        upcomingSessions.map(session => (
                          <SessionCard key={session.id} session={session} isDarkMode={isDarkMode} />
                        ))
                      ) : (
                        <EmptyState 
                          message="No upcoming sessions yet!" 
                          subMessage="Create or join one to get started"
                          isDarkMode={isDarkMode}
                        />
                      )}
                    </div>
                    
                    <button className={`w-full py-3 mt-2 rounded-lg border border-dashed flex items-center justify-center font-medium ${
                      isDarkMode 
                        ? 'border-[#a477ab]/40 text-[#be70a9] hover:bg-[#a477ab]/10' 
                        : 'border-[#a477ab]/30 text-[#a477ab] hover:bg-[#a477ab]/5'
                    }`}>
                      <FiPlus className="mr-2" /> Create New Session
                    </button>
                  </div>
                )}
                
                {activeTab === 'foryou' && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                        Matched Vibes For You
                      </h2>
                      <button className={`text-sm flex items-center ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <FiFilter className="mr-1" /> Filter
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {matchedVibes.map(vibe => (
                        <VibeMatchCard key={vibe.id} vibe={vibe} isDarkMode={isDarkMode} />
                      ))}
                    </div>
                    
                    <Link to="/dashboard/connections" className={`block w-full text-center py-3 rounded-lg ${
                      isDarkMode 
                        ? 'bg-[#a477ab]/20 text-[#be70a9] hover:bg-[#a477ab]/30' 
                        : 'bg-[#a477ab]/10 text-[#a477ab] hover:bg-[#a477ab]/20'
                    }`}>
                      Explore More Vibes
                    </Link>
                  </div>
                )}
                
                {activeTab === 'saved' && (
                  <EmptyState 
                    message="No saved items yet!" 
                    subMessage="Bookmark sessions and vibes that interest you"
                    isDarkMode={isDarkMode}
                  />
                )}
              </div>
            </div>
            
            {/* Connection Recommendations */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
              {/* Gradient border */}
              <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
                <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
              </div>
              <div className={`relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-5`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    People You May Connect With
                  </h2>
                  <Link to="/dashboard/connections" className="text-sm font-medium text-[#c36376] hover:text-[#a477ab]">
                    View All
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {suggestedConnections.map(connection => (
                    <ConnectionCard key={connection.id} connection={connection} isDarkMode={isDarkMode} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Summary Card Component
const ProfileSummaryCard = ({ isDarkMode, currentUser }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md">
      {/* Gradient border */}
      <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
      </div>
      <div className={`relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden`}>
        {/* Profile Header with Cover Image */}
        <div className="h-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] to-[#c36376]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-black/10"></div>
        </div>
        
        {/* Profile Info */}
        <div className="p-5 pt-12 relative">
          {/* Avatar */}
          <div className="absolute -top-8 left-5 rounded-full shadow-md overflow-hidden border-4 border-gray-50 dark:border-gray-800">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="h-16 w-16 object-cover" 
              />
            ) : (
              <div className="h-16 w-16 bg-gradient-to-br from-[#a477ab] to-[#c36376] flex items-center justify-center text-white text-xl font-bold">
                {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          
          {/* Profile Details */}
          <div className="mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentUser?.email || 'email@example.com'}
            </p>
          </div>
          
          {/* Profile Completeness */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Profile Completeness
              </span>
              <span className="text-xs text-[#be70a9]">65%</span>
            </div>
            <div className={`h-1.5 w-full rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#a477ab] to-[#c36376]" 
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          
          {/* Action Button */}
          <Link to="/dashboard/profile" className={`w-full py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
            isDarkMode 
              ? 'bg-[#a477ab]/20 text-[#be70a9] hover:bg-[#a477ab]/30' 
              : 'bg-[#a477ab]/10 text-[#a477ab] hover:bg-[#a477ab]/20'
          }`}>
            <FiUsers className="mr-2" /> Complete Your Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

// Quick Links Card Component
const QuickLinksCard = ({ isDarkMode, notificationsCount }) => {
  const links = [
    { icon: <FiUsers />, label: "My Connections", path: "/dashboard/connections" },
    { icon: <FiCalendar />, label: "My Sessions", path: "/dashboard/events" },
    { icon: <FiLayers />, label: "My Groups", path: "/dashboard/groups" },
    { icon: <FiBell />, label: "Notifications", path: "/dashboard/notifications", count: notificationsCount }
  ];
  
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md">
      {/* Gradient border */}
      <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
      </div>
      <div className={`relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Quick Links</h2>
        </div>
        
        <div className="p-3">
          {links.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className={`flex items-center justify-between p-2 rounded-lg ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`mr-3 p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-[#be70a9]' : 'bg-[#a477ab]/10 text-[#a477ab]'
                }`}>
                  {link.icon}
                </span>
                <span className="font-medium text-sm">{link.label}</span>
              </div>
              {link.count > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#c36376] text-white">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
        </div>
        
        <div className={`px-5 py-4 ${isDarkMode ? 'bg-[#a477ab]/20' : 'bg-[#a477ab]/10'}`}>
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${
              isDarkMode ? 'bg-[#a477ab]/30 text-[#be70a9]' : 'bg-[#a477ab]/20 text-[#a477ab]'
            }`}>
              <FiPlus size={14} />
            </div>
            <Link to="/dashboard/events/new" className={`text-sm font-medium ${
              isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'
            }`}>
              Create New Session
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trending Vibes Card Component
const TrendingVibesCard = ({ isDarkMode, trendingVibes }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md">
      {/* Gradient border */}
      <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
      </div>
      <div className={`relative z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden`}>
        <div className={`px-5 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <FiTrendingUp className={`mr-2 ${isDarkMode ? 'text-[#be70a9]' : 'text-[#a477ab]'}`} />
            <h2 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Trending Vibes
            </h2>
          </div>
        </div>
        
        <div className="p-3">
          {trendingVibes.map((vibe, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-2 rounded-lg ${
                isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {index + 1}. {vibe.name}
              </span>
              <span className="text-xs font-medium text-green-500">
                {vibe.growth}
              </span>
            </div>
          ))}
        </div>
        
        <div className={`p-3 border-t text-center ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Link to="/dashboard/discover" className={`text-sm ${
            isDarkMode ? 'text-[#be70a9] hover:text-[#c36376]' : 'text-[#a477ab] hover:text-[#c36376]'
          }`}>
            Explore All Trends
          </Link>
        </div>
      </div>
    </div>
  );
};

// Session Card Component
const SessionCard = ({ session, isDarkMode }) => {
  const getBgColor = () => {
    if (isDarkMode) {
      return session.visibility === "public" ? "bg-[#a477ab]/20" : "bg-[#c36376]/20";
    } else {
      return session.visibility === "public" ? "bg-[#a477ab]/10" : "bg-[#c36376]/10";
    }
  };
  
  const getTextColor = () => {
    if (isDarkMode) {
      return session.visibility === "public" ? "text-[#be70a9]" : "text-[#c36376]";
    } else {
      return session.visibility === "public" ? "text-[#a477ab]" : "text-[#c36376]";
    }
  };
  
  const icon = session.visibility === "public" ? <FiGlobe /> : <FiLock />;
  
  return (
    <div className={`${getBgColor()} rounded-lg p-4 ${
      isDarkMode ? 'border border-gray-700' : 'border border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 rounded-full overflow-hidden border-2 border-white/30">
            <img 
              src={session.host.avatar} 
              alt={session.host.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {session.name}
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              by {session.host.name}
            </p>
          </div>
        </div>
        
        <div className={`flex items-center ${getTextColor()} text-xs rounded-full px-2 py-1 ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
        }`}>
          {icon}
          <span className="ml-1">{session.visibility === "public" ? "Public" : "Connections"}</span>
        </div>
      </div>
      
      <div className={`flex flex-wrap gap-2 mb-3`}>
        {session.tags.map((tag, index) => (
          <span key={index} className={`text-xs px-2 py-0.5 rounded-full ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
          }`}>
            {tag}
          </span>
        ))}
      </div>
      
      <div className={`grid grid-cols-2 gap-2 mb-3`}>
        <div className="flex items-center">
          <FiClock className={`mr-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={14} />
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {session.time}
          </span>
        </div>
        
        <div className="flex items-center">
          <FiMapPin className={`mr-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={14} />
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {session.location}
          </span>
        </div>
        
        <div className="flex items-center">
          <FiUsers className={`mr-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={14} />
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {session.participants} participants
          </span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button className={`p-1.5 rounded-lg ${
          isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}>
          <FiBookmark size={16} />
        </button>
        
        <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white text-sm font-medium flex items-center">
          <FiSend className="mr-1.5" /> Join
        </button>
      </div>
    </div>
  );
};

// Vibe Match Card Component
const VibeMatchCard = ({ vibe, isDarkMode }) => {
  return (
    <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${
      isDarkMode ? 'border-gray-600' : 'border-gray-200'
    } transition duration-200`}>
      <div className="flex items-center">
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-[#a477ab]/5'
        }`}>
          {vibe.icon}
        </div>
        
        <div className="ml-4 flex-grow">
          <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {vibe.name}
          </h3>
          <div className="flex items-center">
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {vibe.members} members
            </span>
            <span className="mx-2 text-xs text-gray-400">•</span>
            <div className="flex items-center">
              {vibe.categories.map((category, index) => (
                <span key={index} className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                } ${index > 0 ? 'ml-1' : ''}`}>
                  {category}{index < vibe.categories.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`ml-2 p-1.5 rounded-full ${
          isDarkMode ? 'bg-[#a477ab]/20 text-[#be70a9]' : 'bg-[#a477ab]/10 text-[#a477ab]'
        } font-medium text-sm flex items-center`}>
          {vibe.matchScore}%
        </div>
      </div>
      
      <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {vibe.description}
      </p>
      
      <div className="flex justify-between mt-3">
        <button className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
          isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-800/80' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}>
          <FiMessageCircle className="mr-1.5" /> Message
        </button>
        
        <button className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
          isDarkMode 
            ? 'bg-[#a477ab]/20 text-[#be70a9] hover:bg-[#a477ab]/30' 
            : 'bg-[#a477ab]/10 text-[#a477ab] hover:bg-[#a477ab]/20'
        }`}>
          <FiUserPlus className="mr-1.5" /> Join Vibe
        </button>
      </div>
    </div>
  );
};

// Connection Card Component
const ConnectionCard = ({ connection, isDarkMode }) => {
  const connectionStrength = Array(5).fill(0).map((_, i) => (
    <div 
      key={i}
      className={`h-1 w-4 rounded-sm ${i < connection.connectionStrength 
        ? isDarkMode ? 'bg-[#be70a9]' : 'bg-[#a477ab]'
        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    ></div>
  ));

  return (
    <div className={`rounded-lg p-3 flex flex-col ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
        : 'bg-white border-gray-200 hover:bg-gray-50'
    } border transition-colors`}>
      <div className="flex items-center mb-3">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-3 border-2 border-[#a477ab]/30">
          <img 
            src={connection.avatar} 
            alt={connection.name} 
            className="h-full w-full object-cover" 
          />
        </div>
        
        <div>
          <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {connection.name}
          </h3>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {connection.title}
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {connection.interests.map((interest, index) => (
          <span key={index} className={`text-xs px-2 py-0.5 rounded-full ${
            isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-[#a477ab]/5 text-gray-700'
          }`}>
            {interest}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
            Connection Strength
          </p>
          <div className="flex space-x-0.5">
            {connectionStrength}
          </div>
        </div>
        
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {connection.mutualConnections} mutual
        </div>
      </div>
      
      <button className={`mt-auto w-full py-1.5 rounded-lg text-sm font-medium flex items-center justify-center ${
        isDarkMode 
          ? 'bg-[#a477ab]/20 text-[#be70a9] hover:bg-[#a477ab]/30' 
          : 'bg-[#a477ab]/10 text-[#a477ab] hover:bg-[#a477ab]/20'
      }`}>
        <FiUserPlus className="mr-1.5" /> Connect
      </button>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ icon, label, active, onClick, isDarkMode }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3.5 flex items-center justify-center transition-colors ${
      active 
        ? isDarkMode 
          ? 'text-[#be70a9] border-b-2 border-[#be70a9]'
          : 'text-[#a477ab] border-b-2 border-[#a477ab]'
        : isDarkMode
          ? 'text-gray-400 hover:text-gray-300'
          : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    <span className="mr-2">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

// Empty State Component
const EmptyState = ({ message, subMessage, isDarkMode }) => (
  <div className="py-10 flex flex-col items-center justify-center text-center">
    <div className={`h-16 w-16 rounded-full ${
      isDarkMode ? 'bg-[#a477ab]/10 text-[#be70a9]' : 'bg-[#a477ab]/10 text-[#a477ab]'
    } flex items-center justify-center mb-4`}>
      <FiCalendar size={24} />
    </div>
    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {message}
    </h3>
    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      {subMessage}
    </p>
  </div>
);

export default Home;