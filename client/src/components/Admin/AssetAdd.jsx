import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../../context/MenuContext"; 
import { createAsset } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext"; 

const AssetAdd = () => {
  const navigate = useNavigate();
  const {token} = useAuth();
  const { types, categories, collections, fetchMenus } = useMenu(); // Fetch type and category options from Context
  const [parent, setParent] = useState("");
  const [subParent, setSubParent] = useState("");

  const [formData, setFormData] = useState({
    type: "Model",
    title: "",
    category: "",
    collection: "",
    releaseDate: "",
    downloads: 0,
    exportFormats: [],
    earlyAccess: false,
    isNew: false,
    images: [],
  });
  const [newFormat, setNewFormat] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Ensure types and categories are loaded
  useEffect(() => {
    if (!types || !categories) {
      fetchMenus(); // Fetch menus if not already loaded
    }
  }, [types, categories, fetchMenus]);

  const handleChange = (e) => {
    setError("")
    setMessage("")
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "type") {
      console.log(value);
      setParent(value);
    }
    if (name === "category") {
      console.log(value);
      setSubParent(value);
    }
  };

  const handleAddFormat = () => {
    if (
      newFormat.trim() &&
      !formData.exportFormats.includes(newFormat.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        exportFormats: [...prev.exportFormats, newFormat.trim()],
      }));
      setNewFormat("");
      console.log(formData);
    }
    
  };

  const handleRemoveFormat = (format) => {
    setFormData((prev) => ({
      ...prev,
      exportFormats: prev.exportFormats.filter((f) => f !== format),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer?.files || []);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (!validFiles.length) {
      setUploadError("Please upload valid image files.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
    setUploadError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
      console.log("here");
    e.preventDefault();
    try {
      const exportFormatsArray = formData.exportFormats.map((f) => f.trim());
      const data = {...formData, exportFormats: exportFormatsArray};

      // Add code to upload images here if needed
      const response = await createAsset(token, data);
      navigate("/admin");
      setMessage(response?.data?.message || "Asset created!")
    } catch (err) { 
      setError(err.response?.data?.message || "Failed to add asset");
    }
  };

  return (
    <div className="my-6 mx-2 max-w-lg sm:mx-auto p-6 bg-gray-800 rounded-lg shadow-lg relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute sm:top-4 top-2 sm:left-5 left-2 text-lime-500 hover:text-lime-600 text-sm sm:text-base font-medium flex items-center"
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

      <h2 className="text-white text-2xl font-bold mb-4 text-center">
        Add New Asset
      </h2>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {message && <p className="text-center text-lime-500 mb-4">{message}</p>}
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
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
          >
            <option key="0" value="">
              Select Type
            </option>
            {types &&
              types?.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
          >
            <option key="0" value="">
              Select Category
            </option>
            {categories &&
              categories.map(
                (category) =>
                  parent === category.parentId.name && (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  )
              )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Collection
          </label>
          <select
            name="collection"
            value={formData.collection}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg"
          >
            <option key="0" value="">
              Select Collection
            </option> 
            {collections &&
              collections.map(
                (collection) =>
                  subParent === collection.parentId.name && (
                    <option key={collection._id} value={collection.name}>
                      {collection.name}
                    </option>
                  )
              )}
          </select>
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
            className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Export Formats
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
              placeholder="Add export format (e.g., .obj)"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none flex-1"
            />
            <button
              type="button"
              onClick={handleAddFormat}
              className="bg-lime-500 cursor-pointer px-3 py-2 rounded-lg text-gray-900 hover:bg-lime-600"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData?.exportFormats?.map((format, index) => (
              <span
                key={index}
                className="flex items-center bg-lime-600 text-orange-200 px-3 py-1 rounded-lg text-sm"
              >
                {format}
                <button
                  type="button"
                  onClick={() => handleRemoveFormat(format)}
                  className="ml-2 text-black hover:text-rose-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div
          className="mb-4 p-4 border-2 border-dashed border-gray-500 rounded-lg bg-gray-700 text-gray-300 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center cursor-pointer h-full"
          >
            <p className="text-sm mb-2">
              Drag and drop images here or{" "}
              <span className="text-lime-500">click to select</span>
            </p>
            <p className="text-sm text-gray-400">(images)</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
          </label>
        </div>
        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
            {formData?.images?.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Thumbnail"
                  className="rounded-lg object-cover w-full h-24"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index),
                    }))
                  }
                  className="absolute top-1 right-1 bg-slate-700/50 text-white p-2 rounded-full w-auto opacity-0 group-hover:opacity-100 hover:bg-slate-600/30"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {uploadError && (
          <p className="text-red-500 text-center text-sm mb-2">{uploadError}</p>
        )}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="earlyAccess"
            checked={formData.earlyAccess}
            onChange={handleChange}
            className="w-5 h-5 text-lime-500 focus:ring-lime-400 rounded mr-2"
          />
          <label className="text-sm font-medium text-gray-300">
            Early Access
          </label>
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
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AssetAdd;
