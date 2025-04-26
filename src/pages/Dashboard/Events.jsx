import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiSearch, FiFilter, FiPlus, FiChevronRight, FiStar, FiChevronLeft, FiChevronDown } from 'react-icons/fi';

const Events = () => {
  const { currentUser } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
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
              <h1 className="text-3xl font-bold text-gray-800">Events</h1>
              <p className="text-gray-600">Discover and join exciting activities</p>
            </div>
            
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-lg flex items-center font-medium shadow-md"
              whileHover={{ y: -2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              whileTap={{ y: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              <FiPlus className="mr-2" />
              Create Event
            </motion.button>
          </div>
        </motion.div>
        
        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiStar className="mr-2 text-[#c36376]" />
                Featured Events
              </h2>
              <button className="text-[#a477ab] text-sm font-medium flex items-center hover:underline">
                See all <FiChevronRight className="ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map(event => (
                <FeaturedEventCard key={event.id} event={event} />
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
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div className="flex-grow max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events by title, category, location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a477ab] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                className="px-4 py-2 flex items-center text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="mr-2" />
                Filters
                <FiChevronDown className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <motion.div 
                className="pt-4 border-t border-gray-100 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category.toLowerCase() 
                            ? 'bg-[#a477ab] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory(category.toLowerCase())}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="flex flex-wrap gap-2">
                    {dateFilters.map(filter => (
                      <button
                        key={filter}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedDate === filter.toLowerCase() 
                            ? 'bg-[#a477ab] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedDate(filter.toLowerCase())}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Tabs Navigation */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex bg-white rounded-lg shadow-md p-1">
            <TabButton 
              active={activeTab === 'upcoming'} 
              onClick={() => setActiveTab('upcoming')}
              label="Upcoming"
              count={filteredUpcomingEvents.length}
            />
            {filteredOngoingEvents.length > 0 && (
              <TabButton 
                active={activeTab === 'happening'} 
                onClick={() => setActiveTab('happening')}
                label="Happening Now"
                count={filteredOngoingEvents.length}
                highlight={true}
              />
            )}
            <TabButton 
              active={activeTab === 'past'} 
              onClick={() => setActiveTab('past')}
              label="Past"
              count={filteredPastEvents.length}
            />
          </div>
        </motion.div>
        
        {/* Events List */}
        <motion.div
          className="grid gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {activeTab === 'upcoming' && (
            <>
              {filteredUpcomingEvents.length > 0 ? (
                filteredUpcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <EmptyState 
                  message="No upcoming events found" 
                  subMessage={searchQuery || selectedCategory !== 'all' || selectedDate !== 'all' 
                    ? "Try changing your filters to see more events" 
                    : "Check back later for upcoming events"} 
                />
              )}
            </>
          )}
          
          {activeTab === 'happening' && (
            <>
              {filteredOngoingEvents.length > 0 ? (
                filteredOngoingEvents.map(event => (
                  <EventCard key={event.id} event={event} isHappening={true} />
                ))
              ) : (
                <EmptyState 
                  message="No events happening now" 
                  subMessage="Check back later or explore upcoming events" 
                />
              )}
            </>
          )}
          
          {activeTab === 'past' && (
            <>
              {filteredPastEvents.length > 0 ? (
                filteredPastEvents.map(event => (
                  <EventCard key={event.id} event={event} isPast={true} />
                ))
              ) : (
                <EmptyState 
                  message="No past events found" 
                  subMessage="Your event history will appear here" 
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
const TabButton = ({ active, onClick, label, count, highlight }) => {
  return (
    <button
      className={`flex-1 py-3 px-4 rounded-lg transition-colors relative ${
        active 
          ? 'bg-[#a477ab]/10 text-[#a477ab]'
          : highlight 
            ? 'text-[#c36376] hover:bg-[#c36376]/5'
            : 'text-gray-600 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className="flex items-center justify-center">
        {label}
        {count > 0 && (
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
            active 
              ? 'bg-[#a477ab]/20'
              : highlight 
                ? 'bg-[#c36376]/20'
                : 'bg-gray-200'
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

// Featured Event Card Component
const FeaturedEventCard = ({ event }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Event Image */}
      <div className="h-48 w-full relative">
        <img 
          src={event.imgSrc} 
          alt={event.title} 
          className="h-full w-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center mb-2">
            <span className={`px-2.5 py-1 ${
              event.isRemote 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-green-100 text-green-600'
            } rounded-full text-xs font-medium`}>
              {event.isRemote ? 'Virtual' : 'In-Person'}
            </span>
            <span className="ml-2 px-2.5 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
              {event.category}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg">{event.title}</h3>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="p-4">
        {/* Date and Time */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FiCalendar className="mr-2" />
          <span>{event.date}</span>
        </div>
        
        {/* Location */}
        <div className="flex items-start text-sm text-gray-600 mb-3">
          <FiMapPin className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        
        {/* Participants */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <FiUsers className="mr-2" />
            <span>{event.participants} participating</span>
          </div>
          <motion.button
            className="px-3 py-1.5 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Standard Event Card Component
const EventCard = ({ event, isHappening, isPast }) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        isHappening ? 'border-2 border-[#c36376]' : ''
      }`}
      whileHover={{ y: -3, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/4 h-48 md:h-auto relative">
          <img 
            src={event.imgSrc} 
            alt={event.title} 
            className="h-full w-full object-cover"
          />
          {isHappening && (
            <div className="absolute top-2 left-2 px-2.5 py-1 bg-red-500 text-white rounded-full text-xs font-medium flex items-center animate-pulse">
              <span className="mr-1">●</span> Live Now
            </div>
          )}
          {isPast && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <span className="px-3 py-1 bg-white/80 rounded-full text-gray-800 text-sm font-medium">
                Past Event
              </span>
            </div>
          )}
        </div>
        
        {/* Event Details */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-2 py-0.5 ${
              event.isRemote
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-green-100 text-green-600'
            } rounded-full text-xs font-medium`}>
              {event.isRemote ? 'Virtual' : 'In-Person'}
            </span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
              {event.category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
          
          <div className="space-y-2 mb-4 flex-grow">
            {/* Date and Time */}
            <div className="flex items-center text-sm text-gray-600">
              <FiCalendar className="mr-2 text-gray-500" />
              <span>{event.date}</span>
            </div>
            
            {/* Location */}
            <div className="flex items-start text-sm text-gray-600">
              <FiMapPin className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <span>{event.location}</span>
                {event.address && (
                  <p className="text-gray-500 text-xs mt-0.5">{event.address}</p>
                )}
              </div>
            </div>
            
            {/* Host */}
            <div className="flex items-center text-sm">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img 
                  src={event.hostAvatar} 
                  alt={event.hostName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-gray-600">Hosted by <span className="text-gray-800">{event.hostName}</span></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <FiUsers className="mr-2" />
              <span>{event.participants} participating</span>
            </div>
            
            <motion.button
              className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center ${
                isPast 
                  ? 'bg-gray-100 text-gray-700'
                  : isHappening
                    ? 'bg-[#c36376] text-white'
                    : 'bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white'
              }`}
              whileHover={{ scale: isPast ? 1 : 1.05 }}
              whileTap={{ scale: isPast ? 1 : 0.95 }}
              disabled={isPast}
            >
              {isPast ? (
                'View Summary'
              ) : isHappening ? (
                <>Join Now</>
              ) : (
                <>View Details</>
              )}
              <FiChevronRight className="ml-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ message, subMessage }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 bg-[#a477ab]/10 rounded-full flex items-center justify-center text-[#a477ab] mb-4">
        <FiCalendar size={28} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      <p className="text-gray-500 max-w-md mb-6">{subMessage}</p>
      <motion.button
        className="px-4 py-2 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white rounded-lg flex items-center font-medium"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        <FiPlus className="mr-2" />
        Create an Event
      </motion.button>
    </div>
  );
};

export default Events;