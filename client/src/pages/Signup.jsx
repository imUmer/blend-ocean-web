import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center text-gray-300">
      <div className="w-full max-w-sm p-8 bg-slate-800 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-100">Register</h2>
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
          <div>
            <label htmlFor="confirm-password" className="block text-sm text-gray-400">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-lime-500 text-black py-2 rounded-lg hover:bg-lime-600 transition"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">Already have an account? <a href="/login" className="text-lime-500 hover:underline">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
