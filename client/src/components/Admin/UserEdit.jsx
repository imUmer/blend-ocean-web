import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, updateUserById } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";

const UserEdit = () => {
  const { id } = useParams(); 
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    photoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const user = await fetchUserById(token, id); // Fetch user details by ID
        setFormData({
          name: user.name,
          username: user.username,
          email: user.email,
          password: "", // Password not fetched for security reasons
          isAdmin: user.isAdmin,
          photoUrl: user.photoUrl || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
        setLoading(false);
      }
    };

    getUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserById(id, formData); // Update user details
      navigate("/admin/users"); // Redirect to user management page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a new password or leave blank"
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Is Admin
          </label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            className="w-5 h-5 text-lime-500 focus:ring-lime-400 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-lime-500 px-6 py-2 rounded-lg text-gray-900 hover:bg-lime-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
