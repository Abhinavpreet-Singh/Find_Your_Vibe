import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { FiBell, FiCheck, FiChevronRight, FiMessageCircle, FiTrash2, FiUser, FiUsers, FiCalendar, FiClock, FiMoreVertical, FiFilter } from 'react-icons/fi';

const Notifications = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Simulate API request
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'connection_request',
          read: false,
          timestamp: 'Just now',
          data: {
            user: {
              name: 'Alex Johnson',
              avatar: 'https://i.pravatar.cc/150?img=1',
            },
            message: 'sent you a connection request'
          }
        },
        {
          id: 2,
          type: 'event_invitation',
          read: false,
          timestamp: '30 minutes ago',
          data: {
            user: {
              name: 'Sarah Davis',
              avatar: 'https://i.pravatar.cc/150?img=5',
            },
            event: {
              title: 'Jazz Jam Session',
              time: 'Tomorrow, 7:00 PM'
            },
            message: 'invited you to an event'
          }
        },
        {
          id: 3,
          type: 'connection_accepted',
          read: false,
          timestamp: '2 hours ago',
          data: {
            user: {
              name: 'Emma López',
              avatar: 'https://i.pravatar.cc/150?img=9',
            },
            message: 'accepted your connection request'
          }
        },
        {
          id: 4,
          type: 'event_reminder',
          read: true,
          timestamp: '5 hours ago',
          data: {
            event: {
              title: 'Web3 Workshop',
              time: 'Today, 3:00 PM'
            },
            message: 'starts in 1 hour'
          }
        },
        {
          id: 5,
          type: 'message',
          read: true,
          timestamp: 'Yesterday',
          data: {
            user: {
              name: 'David Kim',
              avatar: 'https://i.pravatar.cc/150?img=13',
            },
            message: 'sent you a message',
            preview: 'Hey, are you interested in joining our study group?'
          }
        },
        {
          id: 6,
          type: 'event_update',
          read: true,
          timestamp: 'Yesterday',
          data: {
            event: {
              title: 'Basketball Tournament',
              time: 'Saturday, 10:00 AM'
            },
            message: 'has been rescheduled'
          }
        },
        {
          id: 7,
          type: 'system',
          read: true,
          timestamp: '2 days ago',
          data: {
            message: 'Your profile is 80% complete. Add more information to improve your matches!'
          }
        },
        {
          id: 8,
          type: 'connection_suggestion',
          read: true,
          timestamp: '3 days ago',
          data: {
            users: [
              {
                name: 'Priya Sharma',
                avatar: 'https://i.pravatar.cc/150?img=25',
              },
              {
                name: 'Mark Zhang',
                avatar: 'https://i.pravatar.cc/150?img=15',
              },
              {
                name: 'Olivia Kim',
                avatar: 'https://i.pravatar.cc/150?img=29',
              }
            ],
            message: 'new connection suggestions based on your interests'
          }
        }
      ]);
      
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const readNotifications = notifications.filter(notification => notification.read);
  
  // Get filtered notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return unreadNotifications;
      case 'read':
        return readNotifications;
      default:
        return notifications;
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true }
        : notification
    ));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      <DashboardNavbar />
      
      <div className="pt-24 px-4 max-w-5xl mx-auto">
        {/* Page Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            {unreadNotifications.length > 0 && (
              <button 
                onClick={markAllAsRead}
                className="px-4 py-2 bg-[#a477ab]/10 text-[#a477ab] rounded-lg flex items-center font-medium hover:bg-[#a477ab]/20 transition"
              >
                <FiCheck className="mr-2" />
                Mark all as read
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Tabs Navigation */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex bg-white rounded-lg shadow-md p-1">
            <TabButton 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
              label="All"
              count={notifications.length}
            />
            <TabButton 
              active={activeTab === 'unread'} 
              onClick={() => setActiveTab('unread')}
              label="Unread"
              count={unreadNotifications.length}
              highlight={unreadNotifications.length > 0}
            />
            <TabButton 
              active={activeTab === 'read'} 
              onClick={() => setActiveTab('read')}
              label="Read"
              count={readNotifications.length}
            />
          </div>
        </motion.div>
        
        {/* Notifications List */}
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {getFilteredNotifications().length > 0 ? (
            <div className="divide-y divide-gray-100">
              {getFilteredNotifications().map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, label, count, highlight = false }) => {
  return (
    <button
      className={`flex-1 py-2 px-4 rounded-lg transition-colors relative ${
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

// Notification Item Component
const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  
  // Define icon based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'connection_request':
      case 'connection_accepted':
      case 'connection_suggestion':
        return (
          <div className="p-2 rounded-full bg-purple-100 text-[#a477ab]">
            <FiUsers size={18} />
          </div>
        );
      case 'event_invitation':
      case 'event_reminder':
      case 'event_update':
        return (
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <FiCalendar size={18} />
          </div>
        );
      case 'message':
        return (
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <FiMessageCircle size={18} />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100 text-gray-600">
            <FiBell size={18} />
          </div>
        );
    }
  };
  
  // Render notification content based on type
  const renderNotificationContent = () => {
    const { data } = notification;
    
    switch (notification.type) {
      case 'connection_request':
      case 'connection_accepted':
        return (
          <>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img 
                  src={data.user.avatar} 
                  alt={data.user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-medium text-gray-900">{data.user.name}</span>
                {' '}
                <span className="text-gray-600">{data.message}</span>
              </div>
            </div>
            {notification.type === 'connection_request' && (
              <div className="mt-3 flex space-x-2">
                <button className="px-3 py-1.5 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white text-sm font-medium rounded-lg hover:opacity-90">
                  Accept
                </button>
                <button className="px-3 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                  Ignore
                </button>
              </div>
            )}
          </>
        );
        
      case 'event_invitation':
        return (
          <>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img 
                  src={data.user.avatar} 
                  alt={data.user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-medium text-gray-900">{data.user.name}</span>
                {' '}
                <span className="text-gray-600">{data.message}:</span>
                {' '}
                <span className="font-medium text-blue-600">{data.event.title}</span>
                {' '}
                <span className="text-gray-500">({data.event.time})</span>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#a477ab] to-[#c36376] text-white text-sm font-medium rounded-lg hover:opacity-90">
                Attend
              </button>
              <button className="px-3 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                Decline
              </button>
              <button className="px-3 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                Maybe
              </button>
            </div>
          </>
        );
        
      case 'event_reminder':
      case 'event_update':
        return (
          <div>
            <span className="font-medium text-blue-600">{data.event.title}</span>
            {' '}
            <span className="text-gray-600">{data.message}</span>
            {' '}
            <span className="text-gray-500">({data.event.time})</span>
          </div>
        );
        
      case 'message':
        return (
          <>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                <img 
                  src={data.user.avatar} 
                  alt={data.user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-medium text-gray-900">{data.user.name}</span>
                {' '}
                <span className="text-gray-600">{data.message}</span>
              </div>
            </div>
            {data.preview && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-gray-600 text-sm italic">
                "{data.preview}"
              </div>
            )}
            <div className="mt-3">
              <button className="px-3 py-1.5 bg-[#a477ab]/10 text-[#a477ab] text-sm font-medium rounded-lg hover:bg-[#a477ab]/20 flex items-center w-auto">
                <FiMessageCircle className="mr-1.5" />
                Reply
              </button>
            </div>
          </>
        );
        
      case 'connection_suggestion':
        return (
          <div>
            <div className="mb-2">
              <span className="font-medium text-gray-900">{data.users.length}</span>
              {' '}
              <span className="text-gray-600">{data.message}</span>
            </div>
            <div className="flex mb-3">
              {data.users.map((user, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                  style={{ marginLeft: index > 0 ? '-0.5rem' : 0 }}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <button className="px-3 py-1.5 border border-[#a477ab] text-[#a477ab] text-sm font-medium rounded-lg hover:bg-[#a477ab]/5 flex items-center w-auto">
              <FiUser className="mr-1.5" />
              View Suggestions
            </button>
          </div>
        );
        
      default:
        return (
          <div>
            <span className="text-gray-600">{data.message}</span>
          </div>
        );
    }
  };
  
  return (
    <div 
      className={`p-4 hover:bg-gray-50 transition-colors relative ${
        !notification.read ? 'bg-purple-50/30' : ''
      }`}
    >
      <div className="flex">
        {/* Left: Icon */}
        <div className="mr-4 flex-shrink-0">
          {getNotificationIcon()}
        </div>
        
        {/* Middle: Content */}
        <div className="flex-grow pr-8">
          {renderNotificationContent()}
          
          {/* Timestamp */}
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <FiClock className="mr-1" size={12} />
            {notification.timestamp}
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="absolute top-4 right-4 flex items-center">
          <div className="relative">
            <button 
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <FiMoreVertical size={16} />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 py-1">
                {!notification.read && (
                  <button 
                    onClick={() => {
                      onMarkAsRead(notification.id);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiCheck className="mr-2" size={14} />
                    Mark as read
                  </button>
                )}
                <button 
                  onClick={() => {
                    onDelete(notification.id);
                    setShowActions(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <FiTrash2 className="mr-2" size={14} />
                  Remove
                </button>
              </div>
            )}
          </div>
          
          {!notification.read && (
            <div className="ml-2 w-2 h-2 bg-[#a477ab] rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="h-16 w-16 bg-[#a477ab]/10 rounded-full flex items-center justify-center mb-4">
        <FiBell size={32} className="text-[#a477ab]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">No notifications</h3>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        When you get notifications, they'll appear here.
      </p>
    </div>
  );
};

export default Notifications;