
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

  export default SettingsSection;