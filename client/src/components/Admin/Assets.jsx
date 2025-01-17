import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssetsSection = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch assets from the database
  const fetchAssets = async () => {
    try {
      const { data } = await axios.get("/api/models"); // Replace with your actual API endpoint
      setAssets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  // Delete an asset
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this asset?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/models/${id}`); // Replace with your actual API endpoint
        setAssets((prevAssets) => prevAssets.filter((asset) => asset._id !== id)); // Update state
        alert("Asset deleted successfully!");
      } catch (error) {
        console.error("Error deleting asset:", error.response?.data?.message || error.message);
        alert("Failed to delete asset. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const openAddAssets = () => {
    navigate('/admin/assets')
  }
  const handleEdit = (id) => {
    navigate(`/admin/assets/${id}`)
  }

  
  return (
    <div >
      <h2 className="text-2xl font-bold mb-4">Manage Assets</h2>
      <p className="mb-4">View, edit, or delete existing Assets or add new ones.</p>
      <button onClick={openAddAssets} className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600 mb-4">
        Add New Product
      </button>
      {/* Assets Table */}
      {loading ? (
        <p>Loading assets...</p>
      ) : assets.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id} className="border-t border-gray-600">
                <td className="p-3">{asset.title}</td>
                <td className="p-3">{asset.type}</td>
                <td className="p-3">{asset.category}</td>
                <td className="p-3">
                  <button className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2"  onClick={() => handleEdit(asset._id)}>
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(asset._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assets found.</p>
      )}
    </div>
  );
};

export default AssetsSection;
