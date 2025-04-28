import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Loader from './components/Loader';

// Import pages with new folder structure
import HomepageHome from './pages/Homepage/Home';
import Login from './pages/Homepage/Login';
import Signup from './pages/Homepage/Signup';
import ForgotPassword from './pages/Homepage/ForgotPassword';
import Contact from './pages/Homepage/Contact';
import Cookies from './pages/Homepage/Cookies';
import Privacy from './pages/Homepage/Privacy';
import Terms from './pages/Homepage/Terms';
import DashboardHome from './pages/Dashboard/Home';
import Connections from './pages/Dashboard/Connections';
import Groups from './pages/Dashboard/Groups';
import Events from './pages/Dashboard/Events';
import Notifications from './pages/Dashboard/Notifications';
import Profile from './pages/Dashboard/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading, authInitialized } = useAuth();
  
  if (loading || !authInitialized) {
    return <Loader />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Protected Route that requires completed profile
const ProfileProtectedRoute = ({ children }) => {
  const { currentUser, loading, profileCompleted, authInitialized } = useAuth();
  
  if (loading || !authInitialized) {
    return <Loader />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (!profileCompleted) {
    return <Navigate to="/dashboard/profile" />;
  }
  
  return children;
};

// Public Route that redirects authenticated users to dashboard
const PublicRoute = ({ children }) => {
  const { currentUser, loading, authInitialized } = useAuth();
  
  if (loading || !authInitialized) {
    return <Loader />;
  }
  
  if (currentUser) {
    return <Navigate to="/dashboard/home" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomepageHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Auth routes - redirect to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } 
          />

                    <Route 
            path="/forgot-password" 
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } 
          />
          
          {/* Dashboard routes - require authentication */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/home" />} />
          
          <Route 
            path="/dashboard/home" 
            element={
              <ProfileProtectedRoute>
                <DashboardHome />
              </ProfileProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/connections" 
            element={
              <ProfileProtectedRoute>
                <Connections />
              </ProfileProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/events" 
            element={
              <ProfileProtectedRoute>
                <Events />
              </ProfileProtectedRoute>
            } 
          />

                    <Route 
            path="/dashboard/groups" 
            element={
              <ProfileProtectedRoute>
                <Groups />
              </ProfileProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/notifications" 
            element={
              <ProfileProtectedRoute>
                <Notifications />
              </ProfileProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all route for 404s */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;