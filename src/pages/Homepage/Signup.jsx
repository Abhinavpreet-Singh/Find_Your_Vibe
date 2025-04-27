import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/homepage/Navbar";
import { useAuth } from "../../context/AuthContext";
import { saveUserProfile } from "../../firebase/profileService";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn, githubSignIn, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard/profile");
    }
  }, [currentUser, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    
    try {
      setError("");
      setLoading(true);
      const result = await signup(email, password);
      
      // Save basic user profile info
      await saveUserProfile(result.user.uid, {
        email: email,
        createdAt: new Date().toISOString(),
        completedProfile: false
      });
      
      // Redirect to profile setup page
      navigate("/dashboard/profile");
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        setError("Email is already in use. Try logging in instead.");
      } else {
        setError("Failed to create an account. Please try again.");
        console.error("Signup error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await googleSignIn();
      // The redirect to profile page is handled in the googleSignIn function
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await githubSignIn();
      // The redirect to profile page is handled in the githubSignIn function
    } catch (error) {
      setError("Failed to sign in with GitHub. Please try again.");
      console.error("GitHub sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-white via-pink-50 to-orange-50">
      
      {/* White navbar background wrapper */}
      <div className="w-full bg-white shadow-sm z-20">
        <Navbar />
      </div>

      {/* Form Card with Animation - Added more top padding (pt-16) to shift it down */}
      <div className="flex-grow flex items-center justify-center w-full px-4 py-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-br from-[#a477ab] via-[#c36376] to-[#a477ab] drop-shadow-[0_0_10px_rgba(255,168,198,0.9)]">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                disabled={loading}
              />
              <div className="mt-2 flex items-center text-sm">
                <input
                  id="showPassword"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-gray-600">
                  Show Password
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold rounded-xl hover:scale-105 transition-all"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-5 h-5 mr-2">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
              </svg>
              Google
            </button>
            <button
              onClick={handleGithubSignIn}
              disabled={loading}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-5 h-5 mr-2">
                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
