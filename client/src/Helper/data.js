const data = {
  title: "My Sidebar",
  links: [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Model", path: "/model" },
    { id: 3, name: "About", path: "/about" },
    { id: 4, name: "Contact", path: "/contact" },
    { id: 5, name: "Services", path: "/services" },
  ],
  footer: "© 2024 My Website",
};

const mainmenu = {
  title: "Main Menu",
  menus: [
    { id: 1, name: "Textures", path: "/textures" },
    { id: 2, name: "Models", path: "/models" },
    { id: 3, name: "HDRI's", path: "/hdris" },
  ]
};

// Named exports for both constants
export { data, mainmenu };
