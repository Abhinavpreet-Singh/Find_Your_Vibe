import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserProfile, saveUserProfile } from '../firebase/profileService';
import Loader from '../components/Loader';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Effect to handle auth state changes
  useEffect(() => {
    // Set persistence to LOCAL to survive page reloads
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Auth persistence set to local");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "No user");
      setCurrentUser(user);
      
      if (user) {
        // Check if user has completed their profile
        try {
          const userProfile = await getUserProfile(user.uid);
          setProfileCompleted(userProfile?.completedProfile === true);
        } catch (error) {
          console.error("Error checking profile completion:", error);
          setProfileCompleted(false);
        }
      } else {
        setProfileCompleted(false);
      }
      
      setLoading(false);
      setAuthInitialized(true);
    });

    return unsubscribe;
  }, []);

  // Function to update profile completion status
  async function updateProfileCompletionStatus(isCompleted) {
    setProfileCompleted(isCompleted);
  }

  // Email/Password Sign Up
  async function signup(email, password) {
    try {
      console.log("Attempting to create user with email:", email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Initialize an empty profile for the new user
      await saveUserProfile(result.user.uid, { 
        email: result.user.email,
        displayName: result.user.displayName || '',
        createdAt: new Date().toISOString(),
        completedProfile: false
      });
      
      return result;
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      throw error;
    }
  }

  // Email/Password Login
  async function login(email, password) {
    try {
      console.log("Attempting to login with email:", email);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      throw error;
    }
  }

  // Google Sign In
  async function googleSignIn() {
    try {
      console.log("Setting up Google auth provider");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      console.log("Initiating Google popup sign-in");
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is a new user or existing user without a profile
      const userProfile = await getUserProfile(result.user.uid);
      if (!userProfile) {
        // Initialize a profile for this Google user
        await saveUserProfile(result.user.uid, {
          email: result.user.email,
          displayName: result.user.displayName || '',
          profileImage: result.user.photoURL || '',
          createdAt: new Date().toISOString(),
          completedProfile: false
        });
      }
      
      return result;
    } catch (error) {
      console.error("Google Sign-in error:", error.code, error.message);
      if (error.code === 'auth/popup-blocked') {
        console.error("Popup was blocked by the browser");
      }
      throw error;
    }
  }

  // GitHub Sign In
  async function githubSignIn() {
    try {
      console.log("Setting up GitHub auth provider");
      const provider = new GithubAuthProvider();
      console.log("Initiating GitHub popup sign-in");
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is a new user or existing user without a profile
      const userProfile = await getUserProfile(result.user.uid);
      if (!userProfile) {
        // Initialize a profile for this GitHub user
        await saveUserProfile(result.user.uid, {
          email: result.user.email,
          displayName: result.user.displayName || '',
          profileImage: result.user.photoURL || '',
          createdAt: new Date().toISOString(),
          completedProfile: false
        });
      }
      
      return result;
    } catch (error) {
      console.error("GitHub Sign-in error:", error.code, error.message);
      if (error.code === 'auth/popup-blocked') {
        console.error("Popup was blocked by the browser");
      }
      throw error;
    }
  }
  
  // Reset Password
  async function resetPassword(email) {
    try {
      console.log("Sending password reset email to:", email);
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Reset password error:", error.code, error.message);
      throw error;
    }
  }

  // Logout
  async function logout() {
    try {
      console.log("Attempting to log out user");
      return await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.code, error.message);
      throw error;
    }
  }

  const value = {
    currentUser,
    profileCompleted,
    loading,
    authInitialized,
    signup,
    login,
    googleSignIn,
    githubSignIn,
    resetPassword,
    logout,
    updateProfileCompletionStatus
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}