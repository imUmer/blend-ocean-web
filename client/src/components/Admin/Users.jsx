import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUserById } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmationAlert from "../anim/ConfirmationAlert";

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  // To Edit page
   const handleEdit = (id) => {
    navigate(`/admin/user/${id}`);
   }

  // Handle Delete User
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteUserById(token, selectedUserId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUserId));
      setLoading(false);
      setIsAlertOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      setLoading(false);
      setIsAlertOpen(false);
    }
  };

  // Open Confirmation Alert
  const handleOpenAlert = (id) => {
    setSelectedUserId(id);
    setIsAlertOpen(true);
  };

  // Close Confirmation Alert
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p className="mb-4">View, edit, or remove users from the platform.</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
          {users.map((user) => (
            <tr key={user._id} className="border-t border-gray-600">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.isAdmin ? "Admin" : "User"}</td>
              <td className="p-3">
                    <button onClick={()=>handleEdit(user._id)} className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2">
                      Edit
                    </button>
                    <button
                 className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                 onClick={() => handleOpenAlert(user._id)}
               >
                 Delete
               </button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationAlert
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
      {loading && <p className="text-lime-500 mt-4">Processing...</p>}
    </div>
    
    </div>


    
  );
};

export default UsersSection;
