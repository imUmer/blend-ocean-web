import { useState } from "react";

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

export default MenusSection;