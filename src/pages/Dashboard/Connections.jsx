import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { FiSearch, FiFilter, FiUserPlus, FiMessageCircle, FiMoreVertical, FiUsers } from 'react-icons/fi';

const Connections = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock connections data
  const [allConnections, setAllConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  
  // Simulate API request
  useEffect(() => {
    const timer = setTimeout(() => {
      // Fetch all types of connections
      setAllConnections([
        {
          id: 1,
          name: 'Alex Johnson',
          avatar: 'https://i.pravatar.cc/150?img=1',
          mutualConnections: 5,
          interests: ['Music', 'Photography'],
          status: 'online',
          lastActive: 'Now'
        },
        {
          id: 2,
          name: 'Maya Patel',
          avatar: 'https://i.pravatar.cc/150?img=5',
          mutualConnections: 3,
          interests: ['Sports', 'Coding'],
          status: 'offline',
          lastActive: '2h ago'
        },
        {
          id: 3,
          name: 'Chris Wilson',
          avatar: 'https://i.pravatar.cc/150?img=11',
          mutualConnections: 7,
          interests: ['Music', 'Gaming'],
          status: 'online',
          lastActive: 'Now'
        },
        {
          id: 4,
          name: 'Emma López',
          avatar: 'https://i.pravatar.cc/150?img=9',
          mutualConnections: 2,
          interests: ['Dancing', 'Photography'],
          status: 'offline',
          lastActive: '1d ago'
        },
        {
          id: 5,
          name: 'David Kim',
          avatar: 'https://i.pravatar.cc/150?img=13',
          mutualConnections: 4,
          interests: ['Cooking', 'Movies'],
          status: 'online',
          lastActive: 'Now'
        }
      ]);
      
      setPendingRequests([
        {
          id: 101,
          name: 'Sophia Chen',
          avatar: 'https://i.pravatar.cc/150?img=20',
          mutualConnections: 3,
          interests: ['Design', 'Photography'],
          requestDate: '2d ago'
        },
        {
          id: 102,
          name: 'James Peterson',
          avatar: 'https://i.pravatar.cc/150?img=15',
          mutualConnections: 1,
          interests: ['Sports', 'Music'],
          requestDate: '5d ago'
        }
      ]);
      
      setSuggestedConnections([
        {
          id: 201,
          name: 'Priya Sharma',
          avatar: 'https://i.pravatar.cc/150?img=25',
          mutualConnections: 6,
          interests: ['Music', 'Coding'],
          commonInterests: 2
        },
        {
          id: 202,
          name: 'Mark Zhang',
          avatar: 'https://i.pravatar.cc/150?img=30',
          mutualConnections: 4,
          interests: ['Sports', 'Photography'],
          commonInterests: 1
        },
        {
          id: 203,
          name: 'Olivia Kim',
          avatar: 'https://i.pravatar.cc/150?img=29',
          mutualConnections: 8,
          interests: ['Books', 'Music'],
          commonInterests: 1
        },
        {
          id: 204,
          name: 'Raj Patel',
          avatar: 'https://i.pravatar.cc/150?img=18',
          mutualConnections: 3,
          interests: ['Coding', 'Gaming'],
          commonInterests: 2
        }
      ]);
      
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter connections based on search query
  const filteredConnections = allConnections.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.interests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  // Filter pending connection requests
  const filteredPendingRequests = pendingRequests.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.interests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  // Filter suggested connections
  const filteredSuggestedConnections = suggestedConnections.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.interests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <DashboardNavbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Your Vibes</h1>
          <p className="text-gray-600">Connect with people who share your interests and passions</p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex-grow max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search connections by name or interest..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a477ab] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="px-4 py-2 flex items-center text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FiFilter className="mr-2" />
            Filter
          </button>
        </motion.div>
        
        {/* Tabs Navigation */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex bg-white rounded-lg shadow-md p-1">
            <TabButton 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
              label="All Connections"
              count={allConnections.length}
            />
            <TabButton 
              active={activeTab === 'requests'} 
              onClick={() => setActiveTab('requests')}
              label="Pending Requests"
              count={pendingRequests.length}
              notificationBadge={pendingRequests.length > 0}
            />
            <TabButton 
              active={activeTab === 'suggestions'} 
              onClick={() => setActiveTab('suggestions')}
              label="Suggestions"
              count={suggestedConnections.length}
            />
          </div>
        </motion.div>
        
        {/* Connections Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {activeTab === 'all' && (
            <>
              {filteredConnections.length > 0 ? (
                filteredConnections.map(connection => (
                  <ConnectionCard 
                    key={connection.id} 
                    connection={connection} 
                    type="connection" 
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow-md">
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center text-[#a477ab] mb-4">
                    <FiUsers size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No connections found</h3>
                  <p className="text-gray-500 text-center max-w-md mb-4">
                    {searchQuery ? 'No connections match your search criteria.' : 'You haven\'t connected with anyone yet.'}
                  </p>
                  {!searchQuery && (
                    <button 
                      className="px-4 py-2 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-lg flex items-center"
                      onClick={() => setActiveTab('suggestions')}
                    >
                      <FiUserPlus className="mr-2" />
                      Find people to connect with
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          
          {activeTab === 'requests' && (
            <>
              {filteredPendingRequests.length > 0 ? (
                filteredPendingRequests.map(request => (
                  <ConnectionCard 
                    key={request.id} 
                    connection={request} 
                    type="request" 
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow-md">
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center text-[#a477ab] mb-4">
                    <FiUsers size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No pending requests</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {searchQuery ? 'No requests match your search criteria.' : 'You don\'t have any connection requests at the moment.'}
                  </p>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'suggestions' && (
            <>
              {filteredSuggestedConnections.length > 0 ? (
                filteredSuggestedConnections.map(suggestion => (
                  <ConnectionCard 
                    key={suggestion.id} 
                    connection={suggestion} 
                    type="suggestion" 
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 bg-white rounded-xl shadow-md">
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center text-[#a477ab] mb-4">
                    <FiUsers size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No suggestions available</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    {searchQuery ? 'No suggestions match your search criteria.' : 'We\'re working on finding people you might want to connect with!'}
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, label, count, notificationBadge }) => {
  return (
    <button
      className={`flex-1 py-2 px-4 rounded-lg transition-colors relative ${
        active ? 'bg-[#a477ab]/10 text-[#a477ab]' : 'text-gray-600 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className="flex items-center justify-center">
        {label}
        {count > 0 && (
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${active ? 'bg-[#a477ab]/20' : 'bg-gray-200'}`}>
            {count}
          </span>
        )}
      </span>
      {notificationBadge && (
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
};

// Connection Card Component
const ConnectionCard = ({ connection, type }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="p-6">
        <div className="flex items-start">
          {/* Avatar with status indicator */}
          <div className="relative mr-4">
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={connection.avatar} 
                alt={connection.name} 
                className="h-full w-full object-cover" 
              />
            </div>
            {type === 'connection' && connection.status === 'online' && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          {/* Connection Info */}
          <div className="flex-grow">
            <h3 className="font-bold text-gray-800">{connection.name}</h3>
            {type === 'connection' && (
              <p className="text-xs text-gray-500">
                {connection.status === 'online' ? 'Online now' : `Last active ${connection.lastActive}`}
              </p>
            )}
            {type === 'request' && (
              <p className="text-xs text-gray-500">Sent request {connection.requestDate}</p>
            )}
            {type === 'suggestion' && (
              <p className="text-xs text-gray-500">
                <span className="text-[#a477ab] font-medium">{connection.commonInterests}</span> shared interests
              </p>
            )}
            
            {/* Mutual connections */}
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-medium">{connection.mutualConnections}</span> mutual connections
            </p>
          </div>
          
          {/* Action button based on connection type */}
          <div className="ml-2">
            {type === 'connection' && (
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <FiMoreVertical />
              </button>
            )}
            {type === 'request' && (
              <div className="flex flex-col space-y-2">
                <button className="p-1.5 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-lg">
                  <FiUserPlus size={18} />
                </button>
              </div>
            )}
            {type === 'suggestion' && (
              <button className="p-1.5 bg-[#a477ab]/10 text-[#a477ab] hover:bg-[#a477ab]/20 rounded-lg">
                <FiUserPlus size={18} />
              </button>
            )}
          </div>
        </div>
        
        {/* Interest Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {connection.interests.map((interest, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          {type === 'connection' && (
            <>
              <button className="flex-1 py-2 text-[#a477ab] font-medium hover:bg-[#a477ab]/5 rounded-lg mr-2">
                View Profile
              </button>
              <button className="flex-1 py-2 bg-[#a477ab]/10 text-[#a477ab] font-medium hover:bg-[#a477ab]/20 rounded-lg flex items-center justify-center">
                <FiMessageCircle className="mr-1" />
                Message
              </button>
            </>
          )}
          
          {type === 'request' && (
            <>
              <button className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg mr-2">
                Ignore
              </button>
              <button className="flex-1 py-2 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white font-medium hover:opacity-90 rounded-lg">
                Accept
              </button>
            </>
          )}
          
          {type === 'suggestion' && (
            <button className="w-full py-2 border border-[#a477ab] text-[#a477ab] font-medium hover:bg-[#a477ab]/5 rounded-lg flex items-center justify-center">
              <FiUserPlus className="mr-2" />
              Connect
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Connections;