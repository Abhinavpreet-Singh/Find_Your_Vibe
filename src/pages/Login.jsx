import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // adjust path if needed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("Logging in with:", { email, password });
    setError("");
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
          Log in to Find Your Vibe
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md leading-normal focus:outline-none focus:ring-2 focus:ring-primary-purple"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <label className="text-sm mt-2 inline-flex items-center">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              Show Password
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-orange-400 text-white font-bold rounded-xl hover:scale-105 transition leading-normal tracking-wide"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link
            to="/forgot-password"
            className="text-purple-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
