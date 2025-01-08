import React, { useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", label: "Users" },
    { id: "products", label: "Products" },
    { id: "menus", label: "Menus" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-10 sm:px-4 px-1">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>

      {/* Tabs Navigation */}
      <div className="flex justify-center space-x-4 mb-8 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`sm:px-4 px-1.5 py-2 rounded ${
              activeTab === tab.id
                ? "bg-lime-500 text-gray-900"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="sm:text-md text-sm max-w-5xl mx-auto bg-gray-800 sm:p-8 p-2 rounded-lg shadow-lg">
        {activeTab === "users" && <UsersSection />}
        {activeTab === "products" && <ProductsSection />}
        {activeTab === "menus" && <MenusSection />}
        {activeTab === "settings" && <SettingsSection />}
      </div>
    </div>
  );
};

export default AdminPanel;

const UsersSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p className="mb-4">View, edit, or remove users from the platform.</p>
      {/* Example Table for Users */}
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
          {/* Example User */}
          <tr className="border-t border-gray-600">
            <td className="p-3">John Doe</td>
            <td className="p-3">john@example.com</td>
            <td className="p-3">Admin</td>
            <td className="p-3">
              <button className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2">
                Edit
              </button>
              <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <p className="mb-4">
        View, edit, or delete existing products or add new ones.
      </p>
      <button className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600 mb-4">
        Add New Product
      </button>
      {/* Example Products Table */}
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
          {/* Example Product */}
          <tr className="border-t border-gray-600">
            <td className="p-3">Sample Model</td>
            <td className="p-3">Model</td>
            <td className="p-3">Architecture</td>
            <td className="p-3">
              <button className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 mr-2">
                Edit
              </button>
              <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const MenusSection = () => {
  const [menuName, setMenuName] = useState("");
  const [menus, setMenus] = useState(["Models", "Textures", "HDRIs"]);

  const addMenu = () => {
    if (menuName) {
      setMenus([...menus, menuName]);
      setMenuName(""); // Clear input
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Menus</h2>
      <p className="mb-4">Add, edit, or remove menus from the platform.</p>

      {/* Add New Menu */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="New Menu Name"
          className="flex-grow py-2 px-3 bg-gray-700 rounded text-gray-300 mr-4"
        />
        <button
          onClick={addMenu}
          className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600"
        >
          Add Menu
        </button>
      </div>

      {/* List of Menus */}
      <ul className="text-gray-300">
        {menus.map((menu, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-700 rounded p-3 mb-2"
          >
            {menu}
            <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SettingsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="mb-4">
        Update platform settings or configure admin-specific preferences.
      </p>
      {/* Example Settings */}
      <div className="flex items-center mb-4">
        <label className="flex-grow">Enable Maintenance Mode</label>
        <input type="checkbox" className="w-6 h-6" />
      </div>
      <div className="flex items-center mb-4">
        <label className="flex-grow">Allow User Registrations</label>
        <input type="checkbox" className="w-6 h-6" />
      </div>
    </div>
  );
};
