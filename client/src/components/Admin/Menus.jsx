import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialMenu = [
  { id: 1, name: "Models", parentId: null, type: "menu", category: null, count: null },
  { id: 2, name: "Furniture", parentId: 1, type: "submenu", category: "Models", count: 5 },
  { id: 3, name: "Chairs", parentId: 2, type: "item", category: "Furniture", count: 5 },
];

const MenusSection = () => {
  const [menus, setMenus] = useState(initialMenu);
  const [menuName, setMenuName] = useState("");
  const [menuType, setMenuType] = useState("menu");
  const [parentId, setParentId] = useState(null);
  const navigate = useNavigate();

  const addMenu = () => {
    if (menuName) {
      const newMenu = {
        id: menus.length + 1,
        name: menuName,
        parentId: parentId ? parseInt(parentId) : null,
        type: menuType,
        category: menuType !== "menu" ? menus.find((m) => m.id === parseInt(parentId))?.name || null : null,
        count: menuType === "item" ? 0 : null,
      };
      setMenus([...menus, newMenu]);
      setMenuName("");
      setParentId(null);
      setMenuType("menu");
    }
  };
  
  const editMenu = (id) => {
    navigate(`/admin/menu/${id}`)
  };
  const deleteMenu = (id) => {
    const updatedMenus = menus.filter((menu) => menu.id !== id && menu.parentId !== id);
    setMenus(updatedMenus);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Menus</h2>
      <p className="mb-4">Add, edit, or remove menus, submenus, and items.</p>

      {/* Add New Menu */}
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Name"
          className="flex-grow py-2 px-3 bg-gray-700 rounded text-gray-300"
        />
        <select
          value={menuType}
          onChange={(e) => setMenuType(e.target.value)}
          className="py-2 px-3 bg-gray-700 rounded text-gray-300"
        >
          <option value="menu">Menu</option>
          <option value="submenu">Submenu</option>
          <option value="item">Item</option>
        </select>
        {menuType !== "menu" && (
          <select
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value)}
            className="py-2 px-3 bg-gray-700 rounded text-gray-300"
          >
            <option value="">Select Parent</option>
            {menus
              .filter((menu) => menu.type === "menu" || menu.type === "submenu")
              .map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
          </select>
        )}
        <button
          onClick={addMenu}
          className="bg-lime-500 px-4 py-2 rounded hover:bg-lime-600"
        >
          Add
        </button>
      </div>

      {/* List of Menus */}
      <ul className="text-gray-300">
        {menus
          .filter((menu) => menu.parentId === null)
          .map((menu) => (
            <MenuItem key={menu.id} menu={menu} menus={menus} editMenu={editMenu} deleteMenu={deleteMenu} />
          ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ menu, menus, editMenu, deleteMenu }) => {
  const children = menus.filter((child) => child.parentId === menu.id);

  return (
    <li className="bg-gray-700 rounded p-3 mb-2">
      <div className="flex justify-between items-center">
        <span>{menu.name}</span>
        <div>
          <button
            onClick={() => editMenu(menu?.id)}
            className="bg-lime-500 px-3 py-1 rounded hover:bg-lime-600 ml-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteMenu(menu.id)}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Delete
          </button>
        </div>
      </div>
      {children.length > 0 && (
        <ul className="ml-6 mt-2">
          {children.map((child) => (
            <MenuItem key={child.id} menu={child} menus={menus} deleteMenu={deleteMenu} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenusSection;
