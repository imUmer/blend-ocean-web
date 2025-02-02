import React, { useState, useEffect } from "react";
import ConfirmationAlert from "../anim/ConfirmationAlert";
import {createMenus, updateMenuById, deleteMenuById } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";

const MenuSection = () => {
  const [menus, setMenus] = useState([]);
  const [submenus, setSubmenus] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubmenu, setSelectedSubmenu] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Menu");
  const [editId, setEditId] = useState(null);

  const { token } = useAuth();
  
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Transform API data
  const transformData = (data) => {
    const menuList = data.filter((item) => item.category === "menu").map((menu) => ({
      id: menu._id,
      name: menu.name,
    }));

    const submenuList = data.filter((item) => item.category === "submenu").map((submenu) => ({
      id: submenu._id,
      name: submenu.name,
      count: submenu.count,
      parentId: submenu.parentId._id, // Extract parentId
      parentName: submenu.parentId.name, // Extract parentId
    }));

    const itemList = data.filter((item) => item.category === "item").map((item) => ({
      id: item._id,
      name: item.name,
      count: item.count,
      parentId: item.parentId._id, // Extract parentId
      parentName: item.parentId.name, // Extract parentId
    }));

    return { menuList, submenuList, itemList };
  };

  // Fetch the menu data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/menu/"); // Replace with actual API URL
        const data = await response.json();

        const { menuList, submenuList, itemList } = transformData(data);

        setMenus(menuList);
        setSubmenus(submenuList);
        setItems(itemList);
        console.log(menuList,submenuList,itemList);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Add or Update
  const handleAddOrUpdate = async () => {
    if (!name) return alert("Please enter a name.");
    try {
      
      if (editId) {
      const response = await updateMenuById(token, editId, name);
      if (response.ok) {
        
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
      }
    } else {
        if (type === "Menu") {
         const category = type.toLowerCase()
        const response = await createMenus(token, name, category);
      if (response) {
        const newMenu = { id: response._id, name, category };
        setMenus([...menus, newMenu]);
      }
      } else if (type === "Submenu") {
        if (!selectedMenu)
          return alert("Please select a parent menu for the submenu.");
        const category = type.toLowerCase()
        const response = await createMenus(token, name, category, selectedMenu);
        if (response) {
        const newSubmenu = {
          id: response._id,
          name,
          category,
          parentId: selectedMenu,
          count:0,
        };
        setSubmenus([...submenus, newSubmenu]);
      }
      } else if (type === "Item") {
        if (!selectedSubmenu)
          return alert("Please select a parent submenu for the item.");
        const category = type.toLowerCase()
        const response = await createMenus(token, name, category, selectedSubmenu);
        const newItem = {
          id:  response._id,
          name,
          category,
          parentId: selectedSubmenu,
          count:0,
        };
        setItems([...items, newItem]);
      }
    }
    } catch (error) {
      
    }
    

    setName("");
    setEditId(null);
    setType("Menu");
  };

  // Handle Edit
  const handleEdit = async (id, type) => {
    try {
      setEditId(id);
      setType(type);
        if (type === "Menu") {
          const menu = menus.find((menu) => menu.id === id);
          setName(menu.name);
        } else if (type === "Submenu") {
          const submenu = submenus.find((submenu) => submenu.id === id);
          setName(submenu.name);
          setSelectedMenu(submenu.parentId);
        } else if (type === "Item") {
          const item = items.find((item) => item.id === id);
          setName(item.name);
          setSelectedSubmenu(item.parentId);
        }
    } catch (error) {
    }     
  };


  // Handle deleting an item
const handleDelete = async () => {
  try {
    const response = await deleteMenuById(token, itemToDelete);

    if (response.ok) {
      
      if (type === "Menu") {
        setMenus((prev) => prev.filter((menu) => menu.id !== itemToDelete));
        setSubmenus((prev) => prev.filter((submenu) => submenu.parentId !== itemToDelete));
        setItems((prev) => prev.filter((item) => item.parentId !== itemToDelete));
      } else if (type === "Submenu") {
        setSubmenus((prev) => prev.filter((submenu) => submenu.id !== itemToDelete));
        setItems((prev) => prev.filter((item) => item.parentId !== itemToDelete));
      } else if (type === "Item") {
        setItems((prev) => prev.filter((item) => item.id !== itemToDelete));
      }
    }
    setIsConfirmationOpen(false); // Close the confirmation dialog
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};


  // Confirmation Dialog Handlers
  const handleDeleteClick = (id, type) => {
    setItemToDelete(id);
    setType(type);
    setIsConfirmationOpen(true);
  };

  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
  };

  // Handle menu selection
  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    setSelectedSubmenu(null); // Reset submenu selection
  };

  // Handle submenu selection
  const handleSubmenuClick = (submenuId) => {
    setSelectedSubmenu(submenuId);
  };


  return (
    <div className="p-6 bg-gray-800 text-gray-300">
      <h2 className="text-2xl font-bold mb-6">Manage Menus</h2>

      {/* Confirmation Alert */}
      <ConfirmationAlert
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationDialog}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this item?"
      />


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
                key={menu.id}
                className={`flex justify-between cursor-pointer items-center bg-gray-700 rounded p-3 mb-2 ${
                  menu.id === selectedMenu ? "bg-gray-600" : ""
                }`}
                onClick={() => handleMenuClick(menu.id)}
              >
                <span>{menu.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(menu.id, "Menu");
                    }}
                    className="text-lime-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(menu.id, "Menu");
                    }}
                    className="text-red-400 hover:underline"
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
            {submenus
              .filter((submenu) => submenu.parentId === selectedMenu)
              .map((submenu) => (
                <li
                  key={submenu.id}
                  className={`flex justify-between cursor-pointer items-center bg-gray-700 rounded p-3 mb-2 ${
                    submenu.id === selectedSubmenu ? "bg-gray-600" : ""
                  }`}
                  onClick={() => handleSubmenuClick(submenu.id)}
                >
                  <span>{submenu.name}</span>
                  <span>{submenu.count}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(submenu.id, "Submenu");
                      }}
                      className="text-lime-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(submenu.id, "Submenu");
                      }}
                      className="text-red-400 hover:underline"
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
            {items
              .filter((item) => item.parentId === selectedSubmenu)
              .map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between cursor-cell items-center bg-gray-700 rounded p-3 mb-2"
                >
                  <span>{item.name}</span>
                  <span>{item.count}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id, "Item")}
                      className="text-lime-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id, "Item")}
                      className="text-red-400 hover:underline"
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
};

export default MenuSection;
