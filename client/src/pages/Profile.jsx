import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../services/userService";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const user1 = token ? jwtDecode(token) : null;
  const [user, setUser] = useState(user1);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setProfileData({
          id: userProfile._id,
          name: userProfile.name,
          username: userProfile.username,
          email: userProfile.email,
          role: userProfile.role,
        });
      } catch (err) {
        setMessage("Failed to load profile data.");
      }
    };

    fetchProfile();
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProfile = { ...profileData };
      if (newPassword) {
        updatedProfile.password = newPassword;
      }

      const response = await updateProfile(updatedProfile, token);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-lg px-6 py-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-100">
          My Profile
        </h2>

        {message && (
          <p className="text-sm text-red-500 text-center font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled
            />
          </div>

          <div>
            <label htmlFor="role" className="block mb-1 text-sm font-medium">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={profileData.role ? "Admin" : "User"}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              New Password (Leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-lime-500 text-sm font-semibold text-white py-2 rounded-lg hover:bg-lime-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Update Profile"
            )}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-semibold border-black text-white bg-rose-950 rounded-lg hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
