import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-gray-300">
      <div className="w-full max-w-sm p-8 bg-slate-800 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-100">Sign In</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <input type="checkbox" id="remember" className="text-lime-500" />
              <label htmlFor="remember" className="text-sm text-gray-400 ml-2">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-lime-500 hover:underline">Forgot Password?</a>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-lime-500 text-black py-2 rounded-lg hover:bg-lime-600 transition"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">Don't have an account? <a href="/register" className="text-lime-500 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;