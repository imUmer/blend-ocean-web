import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../services/userService";
import { collection, addDoc } from "firebase/firestore";
import { db, app } from "../firebase";
import FirestoreUserProfile from "../components/FirestoreUserProfile";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    photo: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPic, setLoadingPic] = useState(false);
  const navigate = useNavigate();
  const {user, setUser, token, setToken } = useAuth();
  // const user1 = token ? jwtDecode(token) : null;
  // const [user, setUser] = useState(user1);
  const fileInputRef = useRef(null);
  const [documentId, setDocumentId] = useState(null);
  const [loadingProfilePic, setLoadingProfilePic] = useState(true);

 
  const handleImageClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
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
          photo: userProfile.photoUrl,
          role: userProfile.role,
        });
      } catch (err) {
        setMessage("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, [token,user,documentId]);

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

      await updateProfile(updatedProfile, token);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  

  const [status, setStatus] = useState("");

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      setLoadingPic(true);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          saveImage({ base64String });
        };
        reader.readAsDataURL(file); // Converts to base64
      }
    } catch (error) {
      setMessage(error);
    }
    finally{
      setLoadingPic(false);
    }
  };

  const saveImage = async ({ base64String }) => {
    try {
      setLoadingPic(true);

      const user = profileData;
      if (!user) {
        setStatus("User is not logged in.");
        return;
      }

      const docRef = await addDoc(collection(db, "images"), {
        image: base64String, // Save the Base64 string directly
        createdAt: new Date(),
        userId: user.id,
      });

      const updatedProfile = { ...profileData, photoUrl: docRef.id };

      await updateProfile(updatedProfile, token);
      setDocumentId(docRef.id);
      setStatus(`Image changed successfully!`);
    } catch (error) {
      console.error("Error saving image: ", error);
      setStatus("Failed to save image.");
    }finally {
      setLoadingPic(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-lg px-6 py-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-100">
          My Profile {user?.name}
        </h2>
        <div className="flex items-center justify-center">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />
          <div  onClick={handleImageClick}>
            <FirestoreUserProfile  documentId={profileData.photo} />
          </div>
          <div className="flex absolute z-40 rounded-full">
            {loadingPic &&
            <div className={`w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto 
              ${loadingPic ? "border-lime-400 cursor-not-allowed" : ""}
              `}></div>
            }
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
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
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              New Password (Leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {status && (
            <p className="text-sm text-slate-300 text-center font-medium">
              {status }
            </p>
          )}
          {message && (
            <p className="text-sm text-slate-300 text-center font-medium">
              {message }
            </p>
          )}
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
