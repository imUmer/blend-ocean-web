import React, { useState } from "react";
import { loginUser, googleLogin } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const [formData, setFormData] = useState({email: "", password: "" });
  const [message, setMessage] = useState("");
  const { setUser, setToken } = useAuth(); // Get setToken from AuthContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const googleData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };
      
      const response = await googleLogin(googleData);
      const { token } = response;
      console.log(response, token);
      
      setToken(token); 
      setUser(googleData); 
      setMessage("Logged in successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      const { name, email, photoUrl, token } = response;
      console.log(response);
      

      setToken(token); // Update token in AuthContext
      setUser({name,email,photoUrl}); 
      setMessage("Logged in successfully!");
      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-gray-300">
      <div className="w-full max-w-sm p-8 bg-slate-800 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-100">Sign In</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <input type="checkbox" id="remember" className="text-lime-500" />
              <label htmlFor="remember" className="text-sm text-gray-400 ml-2">
                Remember Me
              </label>
            </div>
            <a href="#" className="text-sm text-lime-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="mt-6">
            {message && (
              <p className="text-sm text-rose-600 text-center font-medium">
                {message}
              </p>
            )}
            <button
              type="submit"
              className={`w-full bg-lime-500 text-black py-2 rounded-lg hover:bg-lime-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className="login-container pt-2">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow hover:shadow-lg"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-4"
            />
            Sign in with Google
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-lime-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
