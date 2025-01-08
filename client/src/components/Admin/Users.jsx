import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getAllUsers(token); // Use adminService
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    getUsers();
  }, []);

   const handleEdit = (id) => {
    navigate(`/admin/user/${id}`);
   }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p className="mb-4">View, edit, or remove users from the platform.</p>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-neutral-800 bg-opacity-50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users?.map((user) => (
                <tr key={user._id} className="border-t border-gray-600">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.isAdmin ? "Admin" : "User"}</td>
                  <td className="p-3">
                    <button onClick={()=>handleEdit(user._id)} className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-t justify-center border-gray-600">
                <td className="p-3">no users!!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersSection;
