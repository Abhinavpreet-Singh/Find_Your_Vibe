import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/homepage/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your email for further instructions");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-orange-100 px-4">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mt-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400 leading-relaxed">
          Reset Your Password
        </h2>
        
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className="bg-green-50 text-green-800 p-3 rounded-lg mb-6 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md leading-normal focus:outline-none focus:ring-2 focus:ring-primary-purple"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold rounded-xl hover:scale-105 transition leading-normal tracking-wide"
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}