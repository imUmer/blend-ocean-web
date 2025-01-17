import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../../context/MenuContext"; 
import { createAsset } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext"; 
import { db } from "../../firebase";
import { collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

const AssetAdd = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { types, categories, collections, fetchMenus } = useMenu();
  
  const [loading, setLoading] = useState(true); // Loading state
  const [imagesLoading, setImagesLoading] = useState(false); // Loading state
  const [parent, setParent] = useState("");
  const [subParent, setSubParent] = useState("");

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("assetFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          type: "",
          typeId: "",
          title: "",
          category: "",
          categoryId: "",
          collection: "",
          collectionId: "",
          releaseDate: "",
          downloads: 0,
          exportFormats: [],
          earlyAccess: false,
          isNew: false,
          images: [],
          assetImagesId: "",
        };
  });
  const [newFormat, setNewFormat] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  
  
  useEffect(() => {
    localStorage.setItem("assetFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const loadMenus = async () => {
      setLoading(true);
      try {
        await fetchMenus(); // Ensure fetchMenus populates `types` and `categories`
      } catch (err) {
        setError("Failed to fetch menu data.");
      } finally {
        setLoading(false);
      }
    };

    if (!types || !categories || !collections) {
      loadMenus();
    } else {
      setLoading(false);
    }
  }, [types, categories, collections, fetchMenus]);

  const handleChange = (e) => {
    setError("");
    setMessage("");
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "type") {
      setParent(value);
      const selectedType = types.find((type) => type.name === value);
      setFormData((prev) => ({
        ...prev,
        typeId: selectedType?._id,
      }));
    }
    if (name === "category") {
      setSubParent(value);
      const selectedCategory = categories.find((category) => category.name === value);
      setFormData((prev) => ({
        ...prev,
        categoryId: selectedCategory?._id,
      }));
    }
    if (name === "collection") {
      const selectedCollection = collections.find((collection) => collection.name === value);
      setFormData((prev) => ({
        ...prev,
        collectionId: selectedCollection?._id,
      }));
    }
  };

  const handleAddFormat = () => {
    setError("");
    setMessage("");
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
    setError("");
    setMessage("");
    setFormData((prev) => ({
      ...prev,
      exportFormats: prev.exportFormats.filter((f) => f !== format),
    }));
  };

  const handleImageUpload = (e) => {
    setError("");
    setMessage("");
    const files = Array.from(e.target.files || e.dataTransfer?.files || []);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (!validFiles.length) {
      setUploadError("Please upload valid image files.");
      return;
    }

     // Convert valid image files to Base64 strings
    const imagePromises = validFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = () => reject("Error reading file");
        reader.readAsDataURL(file); // Read file as Base64
      });
    });

      Promise.all(imagePromises)
      .then((base64Images) => {
        
        setUploadError(null);
        console.log("Images as Base64:", base64Images);
        saveImage({base64Images}); // Save Base64 strings
      })
      .catch((error) => {
        console.error(error);
        setUploadError("Error processing images.");
      });
    setUploadError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /// add images to firebase document and get the id of images
  const saveImage = async ({ base64Images }) => {
      try {
        
        const docId = localStorage.getItem("documentId");
        console.log("here", docId);
        if (docId) {
          const docRef = doc(db, "assetImages", docId); // Adjust collection and document IDs
          await updateDoc(docRef, {
            images: arrayUnion(...base64Images), // Push new images to the existing array
          });
          loadImages(docId)
          console.log(docRef);
      }
        else {
          const docRef = await addDoc(collection(db, "assetImages"), {
            images :arrayUnion(...base64Images),
            id: new Date(),
            date: new Date(),
          });
          localStorage.setItem("documentId", docRef.id);
          setFormData((prev) => ({
            ...prev,
            assetImagesId: docRef.id,
          }));
          loadImages(docRef.id)
      }
        setMessage(`Image loaded successfully!`);
      } catch (error) {
        console.error("Error saving image: ", error);
        setError("Failed to load image.");
      }
    };

    const loadImages = async (docId) => {
      setImagesLoading(true);
      setError(null);
    
      try {
        console.log(localStorage.getItem("documentId"));
        
        if (!localStorage.getItem("documentId")) return;
        const docRef = doc(db, "assetImages", docId); // Adjust collection/document IDs
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setImagesData(docSnap.data()); // Save document data to state
          console.log(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
      } finally {
        setImagesLoading(false);
      }
    }
    // To retrieve images 
    const [imagesData, setImagesData] = useState(() => {
      const savedImages = loadImages(localStorage.getItem("documentId"));
      return savedImages});

    const removeImage = async (image) => {
      console.log(image);
      const docId = localStorage.getItem("documentId");
      if (!docId) return;
      
      const documentRef = doc(db, "assetImages", docId);

      try {
        // Update the document and remove the specific image ID from the array
        const docRef = await updateDoc(documentRef, {
          images: arrayRemove(image),
        });

        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
          console.log("Document data:", docSnapshot.data());
          setImagesData(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
        console.log(docRef);
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(token)
    try {
      const exportFormatsArray = formData.exportFormats.map((f) => f.trim());
      const data = {...formData, exportFormats: exportFormatsArray, images: [imagesData?.images.length > 0 ? imagesData.images[0] : ""]};
      console.log(data);
      
      // Add code to upload images here if needed
      const response = await createAsset(token, data);
      navigate("/admin");
      setMessage(response?.data?.message || "Asset created!")
      localStorage.removeItem("assetFormData");
      localStorage.removeItem("documentId");
    } catch (err) { 
      console.log(err);
      
      setError(err.response?.data?.error || "Failed to add asset");
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Loading data...</p>
      </div>
    );
  }

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
        {imagesData?.images?.length > 0 && (
          <div className="relative grid grid-cols-3 gap-2 mt-4 mb-4">
            { imagesLoading  ? (
              <div className="absolute inset-0 flex items-center justify-center z-30 bg-neutral-800 bg-opacity-50">
                <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) :
            imagesData?.images?.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt="Uploaded Thumbnail"
                  className="rounded-lg object-cover w-full h-24"
                />
                <button
                  type="button"
                  onClick={() =>
                    removeImage(image)
                    // setImagesData((prev) => ({
                    //   ...prev,
                    //   images: prev.images.filter((_, i) => i !== index),
                    // }))
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
