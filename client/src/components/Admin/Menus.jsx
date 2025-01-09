import React, { useState, useEffect } from "react";

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
  const [submenus, setSubmenus] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubmenu, setSelectedSubmenu] = useState(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("Menu");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch the menu data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/menu/"); // Replace with actual API URL
        const data = await response.json();
        
        const menus = data.filter(item => item.category === "menu");
        const submenus = data.filter(item => item.category === "submenu");
        const items = data.filter(item => item.category === "item");

        setMenus(menus);
        setSubmenus(submenus);
        setItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 // Handle Add or Update
 const handleAddOrUpdate = () => {
  if (!name) return alert("Please enter a name.");

  if (editId) {
    // Update logic
    if (type === "Menu") {
      setMenus((prev) =>
        prev.map((menu) => (menu.id === editId ? { ...menu, name } : menu))
      );
    } else if (type === "Submenu") {
      setSubmenus((prev) =>
        prev.map((submenu) =>
          submenu.id === editId ? { ...submenu, name } : submenu
        )
      );
    } else if (type === "Item") {
      setItems((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, name } : item))
      );
    }
  } else {
    // Add logic
    if (type === "Menu") {
      const newMenu = { id: Date.now(), name, count: 0 };
      setMenus([...menus, newMenu]);
    } else if (type === "Submenu") {
      if (!selectedMenu)
        return alert("Please select a parent menu for the submenu.");
      const newSubmenu = {
        id: Date.now(),
        name,
        parentId: selectedMenu,
        count: 0,
      };
      setSubmenus([...submenus, newSubmenu]);
    } else if (type === "Item") {
      if (!selectedSubmenu)
        return alert("Please select a parent submenu for the item.");
      const newItem = { id: Date.now(), name, parentId: selectedSubmenu };
      setItems([...items, newItem]);

      // Update the parent submenu count
      setSubmenus((prev) =>
        prev.map((submenu) =>
          submenu.id === selectedSubmenu
            ? { ...submenu, count: submenu.count + 1 }
            : submenu
        )
      );
    }
  }

  // Reset fields
  setName("");
  setEditId(null);
  setType("Menu");
};

// Handle Edit
const handleEdit = (id, type) => {
  setEditId(id);
  setType(type);

  if (type === "Menu") {
    const menu = menus.find((menu) => menu.id === id);
    setName(menu.name);
  } else if (type === "Submenu") {
    const submenu = submenus.find((submenu) => submenu.id === id);
    setName(submenu.name);
  } else if (type === "Item") {
    const item = items.find((item) => item.id === id);
    setName(item.name);
  }
};

// Handle Delete
const handleDelete = (id, type) => {
  if (type === "Menu") {
    setMenus((prev) => prev.filter((menu) => menu.id !== id));
    setSubmenus((prev) => prev.filter((submenu) => submenu.parentId !== id));
    setItems((prev) => prev.filter((item) => !submenus.some((s) => s.id === item.parentId)));
  } else if (type === "Submenu") {
    setSubmenus((prev) => prev.filter((submenu) => submenu.id !== id));
    setItems((prev) => prev.filter((item) => item.parentId !== id));
  } else if (type === "Item") {
    setItems((prev) => prev.filter((item) => item.id !== id));
    const parentSubmenu = submenus.find((submenu) => submenu.id === selectedSubmenu);
    if (parentSubmenu) {
      setSubmenus((prev) =>
        prev.map((submenu) =>
          submenu.id === selectedSubmenu
            ? { ...submenu, count: submenu.count - 1 }
            : submenu
        )
      );
    }
  }
};

return (
  <div className="p-6 bg-gray-800 text-gray-300">
    <h2 className="text-2xl font-bold mb-6">Manage Menus</h2>

    {/* Add/Edit Form */}
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none"
        >
          <option value="Menu">Menu</option>
          <option value="Submenu">Submenu</option>
          <option value="Item">Item</option>
        </select>

        {/* Submenu Parent Menu */}
        {type === "Submenu" && (
          <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(parseInt(e.target.value))}
            className="py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none"
          >
            <option value="">Select Parent Menu</option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu._id}>
                {menu.name}
              </option>
            ))}
          </select>
        )}

        {/* Item Parent Submenu */}
        {type === "Item" && (
          <select
            value={selectedSubmenu}
            onChange={(e) => setSelectedSubmenu(parseInt(e.target.value))}
            className="py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none"
          >
            <option value="">Select Parent Submenu</option>
            {submenus
              .filter((submenu) => submenu.parentId === selectedMenu)
              .map((submenu) => (
                <option key={submenu._id} value={submenu._id}>
                  {submenu.name}
                </option>
              ))}
          </select>
        )}

        <button
          onClick={handleAddOrUpdate}
          className="py-2 px-4 bg-lime-500 text-black rounded hover:bg-lime-600"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
    </div>

    {/* Menus List */}
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Menus</h3>
        <ul>
          {menus.map((menu) => (
            <li
              key={menu._id}
              className="flex justify-between items-center bg-gray-700 rounded p-3 mb-2"
            >
              {menu.name}
              <div>
                <button
                  onClick={() => handleEdit(menu._id, "Menu")}
                  className="px-3 py-1 bg-lime-500 text-black rounded hover:bg-lime-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(menu._id, "Menu")}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Submenus List */}
      <div>
        <h3 className="text-lg font-bold mb-4">Submenus</h3>
        <ul>
          {submenus.map((submenu) => (
            <li
              key={submenu._id}
              className="flex justify-between items-center bg-gray-700 rounded p-3 mb-2"
            >
              <span>
                {submenu?.name} (Items: {submenu.count}){" "}
                <span className="text-gray-500">{" - Parent: " + menus.find(menu => menu._id )?.name}</span>
              </span>
              <div>
                <button
                  onClick={() => handleEdit(submenu._id, "Submenu")}
                  className="px-3 py-1 bg-lime-500 text-black rounded hover:bg-lime-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(submenu._id, "Submenu")}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Items List */}
      <div>
        <h3 className="text-lg font-bold mb-4">Items</h3>
        <ul>
          {items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center bg-gray-700 rounded p-3 mb-2"
            >
              {item.name}
              <div>
                <button
                  onClick={() => handleEdit(item._id, "Item")}
                  className="px-3 py-1 bg-lime-500 text-black rounded hover:bg-lime-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, "Item")}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}
export default MenuSection;
