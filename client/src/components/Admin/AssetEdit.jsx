import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { fetchAssetById, updateAssetById } from "../../services/assetService";

const AssetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "Model",
    title: "",
    category: "",
    releaseDate: "",
    downloads: 0,
    exportFormats: "",
    earlyAccess: false,
    isNew: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        setLoading(true);
        // const asset = await fetchAssetById(id); // Fetch asset details by ID
        // setFormData({
        //   ...asset,
        //   exportFormats: asset.exportFormats.join(", "), // Convert array to comma-separated string
        // });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch asset details");
        setLoading(false);
      }
    };

    fetchAssetDetails();
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
      const exportFormatsArray = formData.exportFormats.split(",").map((f) => f.trim());
    //   await updateAssetById(id, { ...formData, exportFormats: exportFormatsArray });
      navigate("/assets");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update asset");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="my-6 mx-2 max-w-lg sm:mx-auto p-6 bg-gray-800 rounded-lg shadow-lg relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute -top-4 left-0 text-lime-500 hover:text-lime-600 text-sm sm:text-base font-medium flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back
      </button>

      <h2 className="text-white text-2xl font-bold mb-4 text-center">Edit Asset</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Release Date
          </label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Export Formats (comma separated)
          </label>
          <input
            type="text"
            name="exportFormats"
            value={formData.exportFormats}
            onChange={handleChange}
            placeholder=".obj, .blend, .fbx"
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="earlyAccess"
            checked={formData.earlyAccess}
            onChange={handleChange}
            className="w-5 h-5 text-lime-500 focus:ring-lime-400 rounded mr-2"
          />
          <label className="text-sm font-medium text-gray-300">Early Access</label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
            className="w-5 h-5 text-lime-500 focus:ring-lime-400 rounded mr-2"
          />
          <label className="text-sm font-medium text-gray-300">Is New</label>
        </div>
        <button
          type="submit"
          className="bg-lime-500 px-3 w-full sm:px-6 py-2 rounded-lg text-gray-900 hover:bg-lime-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AssetEdit;