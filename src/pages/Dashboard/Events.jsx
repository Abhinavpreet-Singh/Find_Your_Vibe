import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../components/Loader';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiSearch, FiFilter, FiPlus, FiChevronRight, FiStar, FiChevronLeft, FiChevronDown } from 'react-icons/fi';

const Events = () => {
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock events data
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  
  // Categories
  const categories = ['All', 'Music', 'Sports', 'Technology', 'Art', 'Education', 'Social', 'Gaming'];
  
  // Date filters
  const dateFilters = ['All', 'Today', 'Tomorrow', 'This Week', 'This Month'];
  
  // Simulate API request
  useEffect(() => {
    const timer = setTimeout(() => {
      // Set ongoing events
      setOngoingEvents([
        {
          id: 1,
          title: "Indie Rock Concert",
          category: "Music",
          location: "Urban Lounge",
          address: "123 Music Ave, Downtown",
          date: "Now (Started 30m ago)",
          imgSrc: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 45,
          isRemote: false,
          isFeatured: true,
          hostName: "Sarah Davis",
          hostAvatar: "https://i.pravatar.cc/150?img=5"
        },
        {
          id: 2,
          title: "Hackathon: AI for Good",
          category: "Technology",
          location: "Virtual Event",
          date: "Now (Started 2h ago)",
          imgSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 120,
          isRemote: true,
          isFeatured: false,
          hostName: "Tech Innovators Group",
          hostAvatar: "https://i.pravatar.cc/150?img=12"
        }
      ]);
      
      // Set upcoming events
      setUpcomingEvents([
        {
          id: 101,
          title: "Basketball Tournament",
          category: "Sports",
          location: "Central Park Courts",
          address: "45 Park St, Downtown",
          date: "Today, 4:00 PM",
          imgSrc: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 32,
          isRemote: false,
          isFeatured: true,
          hostName: "City Sports League",
          hostAvatar: "https://i.pravatar.cc/150?img=10"
        },
        {
          id: 102,
          title: "Intro to Web3 Workshop",
          category: "Technology",
          location: "Virtual Event",
          date: "Tomorrow, 1:00 PM",
          imgSrc: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 75,
          isRemote: true,
          isFeatured: false,
          hostName: "Blockchain Enthusiasts",
          hostAvatar: "https://i.pravatar.cc/150?img=18"
        },
        {
          id: 103,
          title: "Community Art Exhibition",
          category: "Art",
          location: "Gallery 23",
          address: "23 Art Avenue, Arts District",
          date: "This Saturday, 11:00 AM",
          imgSrc: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 48,
          isRemote: false,
          isFeatured: true,
          hostName: "Local Arts Collective",
          hostAvatar: "https://i.pravatar.cc/150?img=25"
        },
        {
          id: 104,
          title: "Jazz in the Park",
          category: "Music",
          location: "Riverside Gardens",
          address: "100 River Rd, East Side",
          date: "Next Friday, 6:30 PM",
          imgSrc: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 90,
          isRemote: false,
          isFeatured: false,
          hostName: "City Music Association",
          hostAvatar: "https://i.pravatar.cc/150?img=15"
        },
        {
          id: 105,
          title: "Coding Bootcamp Info Session",
          category: "Education",
          location: "Virtual Event",
          date: "Next Monday, 5:00 PM",
          imgSrc: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 30,
          isRemote: true,
          isFeatured: true,
          hostName: "Code Academy",
          hostAvatar: "https://i.pravatar.cc/150?img=32"
        }
      ]);
      
      // Set past events
      setPastEvents([
        {
          id: 201,
          title: "Virtual Game Night",
          category: "Gaming",
          location: "Virtual Event",
          date: "June 15, 2024",
          imgSrc: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 24,
          isRemote: true,
          hostName: "Gaming Community",
          hostAvatar: "https://i.pravatar.cc/150?img=22"
        },
        {
          id: 202,
          title: "Book Club Meeting",
          category: "Social",
          location: "City Library",
          address: "300 Read St, Downtown",
          date: "June 10, 2024",
          imgSrc: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 15,
          isRemote: false,
          hostName: "Literary Circle",
          hostAvatar: "https://i.pravatar.cc/150?img=28"
        },
        {
          id: 203,
          title: "Photography Showcase",
          category: "Art",
          location: "Modern Arts Center",
          address: "42 Vision Blvd, Arts District",
          date: "June 5, 2024",
          imgSrc: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          participants: 60,
          isRemote: false,
          hostName: "Photography Club",
          hostAvatar: "https://i.pravatar.cc/150?img=40"
        }
      ]);
      
      // Set featured events (taking from both ongoing and upcoming)
      const featured = [
        ...ongoingEvents.filter(event => event.isFeatured),
        ...upcomingEvents.filter(event => event.isFeatured)
      ].slice(0, 3);
      
      setFeaturedEvents(featured);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter events based on category, search query, and date filter
  const filterEvents = (events) => {
    return events.filter(event => {
      // Filter by search query
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by category
      const matchesCategory = 
        selectedCategory.toLowerCase() === 'all' || 
        event.category.toLowerCase() === selectedCategory.toLowerCase();
      
      // Filter by date (simplified)
      let matchesDate = true;
      if (selectedDate.toLowerCase() !== 'all') {
        const today = new Date().toDateString();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toDateString();
        
        if (selectedDate.toLowerCase() === 'today') {
          matchesDate = event.date.toLowerCase().includes('today') || 
                        event.date.toLowerCase().includes('now');
        } else if (selectedDate.toLowerCase() === 'tomorrow') {
          matchesDate = event.date.toLowerCase().includes('tomorrow');
        } else if (selectedDate.toLowerCase() === 'this week') {
          matchesDate = event.date.toLowerCase().includes('this') ||
                        event.date.toLowerCase().includes('next') ||
                        event.date.toLowerCase().includes('tomorrow') ||
                        event.date.toLowerCase().includes('today') ||
                        event.date.toLowerCase().includes('now');
        }
      }
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  };
  
  const filteredUpcomingEvents = filterEvents(upcomingEvents);
  const filteredOngoingEvents = filterEvents(ongoingEvents);
  const filteredPastEvents = filterEvents(pastEvents);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-pink-50 via-white to-orange-50'}`}>
      <DashboardNavbar />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto pb-12">
        {/* Page Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>Events</h1>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Discover and join exciting activities</p>
            </div>
            
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-lg flex items-center font-medium shadow-md"
              whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            >
              <FiPlus className="mr-2" />
              Create Event
            </motion.button>
          </div>
        </motion.div>
        
        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2 className={`text-xl font-bold mb-4 flex items-center ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              <FiStar className="mr-2 text-[#edb04c]" /> Featured Events
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} featured isDarkMode={isDarkMode} />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Search and Filter */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={`relative rounded-xl overflow-hidden shadow-md`}>
            {/* Gradient border */}
            <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
            </div>
            <div className={`relative z-10 ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-4`}>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Search */}
                <div className="w-full md:w-auto flex-grow max-w-md relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search events by title, category, location..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a477ab] focus:border-transparent ${
                      isDarkMode 
                        ? "bg-gray-700 text-gray-100 border-gray-700" 
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Filter Button */}
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    isDarkMode 
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FiFilter className="mr-2" />
                  Filter
                  {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                </button>
              </div>
              
              {/* Expanded Filters */}
              {showFilters && (
                <div className={`mt-4 pt-4 ${isDarkMode ? "border-t border-gray-700" : "border-t border-gray-100"}`}>
                  <div className="flex flex-wrap gap-6">
                    {/* Category Filter */}
                    <div className="w-full sm:w-auto">
                      <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Category</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedCategory.toLowerCase() === category.toLowerCase()
                                ? "bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white"
                                : isDarkMode
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedCategory(category.toLowerCase())}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Date Filter */}
                    <div className="w-full sm:w-auto">
                      <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Date</p>
                      <div className="flex flex-wrap gap-2">
                        {dateFilters.map((dateFilter, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedDate.toLowerCase() === dateFilter.toLowerCase()
                                ? "bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white"
                                : isDarkMode
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedDate(dateFilter.toLowerCase())}
                          >
                            {dateFilter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Events Tabs Navigation */}
        <motion.div 
          className="mb-6 relative rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Gradient border */}
          <div className="absolute -inset-0.5 rounded-lg z-0 overflow-hidden opacity-70">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
          </div>
          <div className={`relative z-10 flex p-1 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <TabButton 
              active={activeTab === 'upcoming'} 
              onClick={() => setActiveTab('upcoming')}
              label="Upcoming"
              count={filteredUpcomingEvents.length}
              isDarkMode={isDarkMode}
            />
            <TabButton 
              active={activeTab === 'ongoing'} 
              onClick={() => setActiveTab('ongoing')}
              label="Happening Now"
              count={filteredOngoingEvents.length}
              highlight={filteredOngoingEvents.length > 0}
              isDarkMode={isDarkMode}
            />
            <TabButton 
              active={activeTab === 'past'} 
              onClick={() => setActiveTab('past')}
              label="Past Events"
              count={filteredPastEvents.length}
              isDarkMode={isDarkMode}
            />
          </div>
        </motion.div>
        
        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {activeTab === 'upcoming' && (
            <>
              {filteredUpcomingEvents.length > 0 ? (
                filteredUpcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} isDarkMode={isDarkMode} />
                ))
              ) : (
                <EmptyState 
                  text={searchQuery || selectedCategory !== 'all' || selectedDate !== 'all' 
                    ? "No events match your search criteria."
                    : "No upcoming events found."
                  }
                  isDarkMode={isDarkMode}
                />
              )}
            </>
          )}
          
          {activeTab === 'ongoing' && (
            <>
              {filteredOngoingEvents.length > 0 ? (
                filteredOngoingEvents.map(event => (
                  <EventCard key={event.id} event={event} isDarkMode={isDarkMode} />
                ))
              ) : (
                <EmptyState 
                  text={searchQuery || selectedCategory !== 'all' || selectedDate !== 'all' 
                    ? "No events match your search criteria."
                    : "No events happening right now."
                  }
                  isDarkMode={isDarkMode}
                />
              )}
            </>
          )}
          
          {activeTab === 'past' && (
            <>
              {filteredPastEvents.length > 0 ? (
                filteredPastEvents.map(event => (
                  <EventCard key={event.id} event={event} isDarkMode={isDarkMode} />
                ))
              ) : (
                <EmptyState 
                  text={searchQuery || selectedCategory !== 'all' || selectedDate !== 'all' 
                    ? "No events match your search criteria."
                    : "No past events found."
                  }
                  isDarkMode={isDarkMode}
                />
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, label, count, highlight = false, isDarkMode }) => {
  return (
    <button
      className={`flex-1 py-2 px-4 rounded-lg transition-colors relative ${
        active 
          ? isDarkMode 
            ? 'bg-[#a477ab]/20 text-[#be70a9]' 
            : 'bg-[#a477ab]/10 text-[#a477ab]'
          : highlight
            ? isDarkMode
              ? 'text-[#e47a8f] hover:bg-[#c36376]/10'
              : 'text-[#c36376] hover:bg-[#c36376]/5'
            : isDarkMode
              ? 'text-gray-400 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className="flex items-center justify-center">
        {label}
        {count > 0 && (
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
            active 
              ? isDarkMode ? 'bg-[#a477ab]/30' : 'bg-[#a477ab]/20' 
              : highlight
                ? isDarkMode ? 'bg-[#c36376]/30' : 'bg-[#c36376]/20'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            {count}
          </span>
        )}
      </span>
      {highlight && !active && (
        <span className="absolute top-1 right-1 h-2 w-2 bg-[#c36376] rounded-full animate-pulse"></span>
      )}
    </button>
  );
};

// Event Card Component
const EventCard = ({ event, featured = false, isDarkMode }) => {
  const isRemote = event.isRemote || event.location?.toLowerCase() === 'virtual event';
  
  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden shadow-md ${featured ? 'border-2 md:col-span-2' : ''}`}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient border */}
      <div className="absolute -inset-0.5 rounded-xl z-0 overflow-hidden opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a477ab] via-[#c36376] to-[#edb04c]"></div>
      </div>
      <div className={`relative z-10 rounded-xl overflow-hidden h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {featured && (
          <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-gradient-to-r from-[#edb04c] to-[#e47a8f] rounded-full text-white text-xs font-medium flex items-center">
            <FiStar className="mr-1" size={12} />
            Featured
          </div>
        )}
      
        {/* Event Image */}
        <div className="h-40 relative">
          <img 
            src={event.imgSrc} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Event Date */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
            <p className="text-white text-sm font-medium flex items-center">
              <FiClock className="mr-1" size={14} />
              {event.date}
            </p>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="p-5">
          {/* Event Category */}
          <div className="mb-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              isDarkMode 
                ? 'bg-[#a477ab]/20 text-[#be70a9]' 
                : 'bg-[#a477ab]/10 text-[#a477ab]'
            }`}>
              {event.category}
            </span>
          </div>
          
          {/* Event Title */}
          <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{event.title}</h3>
          
          {/* Event Location */}
          <div className="flex items-start mb-3">
            <FiMapPin className={`mr-2 mt-1 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isRemote ? 'Virtual Event' : event.location}
              {event.address && <span className="block text-xs mt-0.5 opacity-75">{event.address}</span>}
            </p>
          </div>
          
          {/* Participants */}
          <div className="flex items-center mb-4">
            <FiUsers className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {event.participants} {event.participants === 1 ? 'participant' : 'participants'}
            </p>
          </div>
          
          {/* Host Info */}
          {event.hostName && (
            <div className={`flex items-center pt-4 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
              {event.hostAvatar && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <img 
                    src={event.hostAvatar} 
                    alt={event.hostName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hosted by</p>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{event.hostName}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <div className={`p-4 pt-2 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
          <button className={`w-full py-2 rounded-lg font-medium ${
            isDarkMode 
              ? event.date.toLowerCase().includes('now') 
                ? 'bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white' 
                : 'border border-[#be70a9] text-[#be70a9] hover:bg-[#a477ab]/10'
              : event.date.toLowerCase().includes('now') 
                ? 'bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white' 
                : 'border border-[#a477ab] text-[#a477ab] hover:bg-[#a477ab]/5'
          }`}>
            {event.date.toLowerCase().includes('now') 
              ? 'Join Now' 
              : event.date.toLowerCase().includes('ago') || event.date.toLowerCase().includes('past')
                ? 'View Details'
                : 'RSVP'
            }
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ text, isDarkMode }) => {
  return (
    <div className={`col-span-full flex flex-col items-center justify-center py-10 rounded-xl shadow-md ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
        isDarkMode ? 'bg-[#a477ab]/20 text-[#be70a9]' : 'bg-[#a477ab]/10 text-[#a477ab]'
      }`}>
        <FiCalendar size={28} />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>No events found</h3>
      <p className={`text-center max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {text}
      </p>
    </div>
  );
};

export default Events;