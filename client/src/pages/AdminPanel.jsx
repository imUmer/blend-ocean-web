import React, { useState } from "react";
import UsersSection from '../components/Admin/Users';
import AssetsSection from '../components/Admin/Assets';
import MenusSection from '../components/Admin/Menus';
import SettingsSection from '../components/Admin/Settings';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");

  const tabs = [
    { id: "users", label: "Users" },
    { id: "assets", label: "Assets" },
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
        {activeTab === "assets" && <AssetsSection />}
        {activeTab === "menus" && <MenusSection />}
        {activeTab === "settings" && <SettingsSection />}
      </div>
    </div>
  );
};

export default AdminPanel;

