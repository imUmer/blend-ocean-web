import { useState } from "react";

const MenuEdit = ({ menu, onSave }) => {
  const [menuName, setMenuName] = useState(menu.name);
  const [menuType, setMenuType] = useState(menu.type);
  const [parentId, setParentId] = useState(menu.parentId);

  const handleSave = () => {
    onSave({ ...menu, name: menuName, type: menuType, parentId });
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-xl font-bold mb-4">Edit Menu</h3>
      <div className="mb-4">
        <label className="block mb-1 text-gray-300">Name</label>
        <input
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          className="py-2 px-3 bg-gray-700 rounded text-gray-300 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-300">Type</label>
        <select
          value={menuType}
          onChange={(e) => setMenuType(e.target.value)}
          className="py-2 px-3 bg-gray-700 rounded text-gray-300 w-full"
        >
          <option value="menu">Menu</option>
          <option value="submenu">Submenu</option>
          <option value="item">Item</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-300">Parent</label>
        <input
          type="text"
          value={parentId || ""}
          onChange={(e) => setParentId(e.target.value)}
          placeholder="Parent ID"
          className="py-2 px-3 bg-gray-700 rounded text-gray-300 w-full"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600"
      >
        Save
      </button>
    </div>
  );
};

export default MenuEdit;