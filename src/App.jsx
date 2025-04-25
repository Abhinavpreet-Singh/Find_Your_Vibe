import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Loader from './components/Loader';

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
    return <Navigate to="/profile" />;
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
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          
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
          
          {/* Profile route - requires authentication but not completed profile */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - require authentication AND completed profile */}
          <Route 
            path="/dashboard" 
            element={
              <ProfileProtectedRoute>
                <Dashboard />
              </ProfileProtectedRoute>
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