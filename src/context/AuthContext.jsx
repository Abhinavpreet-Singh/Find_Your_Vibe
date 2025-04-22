import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';
import Loader from '../components/Loader';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Email/Password Sign Up
  async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Email/Password Login
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google Sign In
  async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // GitHub Sign In
  async function githubSignIn() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }
  
  // Reset Password
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Logout
  async function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    googleSignIn,
    githubSignIn,
    resetPassword,
    logout
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