const data = {
  title: "My Sidebar",
  links: [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Models", path: "/models" },
    { id: 3, name: "Textures", path: "/textures" },
    { id: 4, name: "Hdris", path: "/hdris" },
    { id: 5, name: "Learn", path: "/learn" },
    { id: 6, name: "Blogs", path: "/blogs" },
    { id: 7, name: "About", path: "/about" },
  ],
};

const footer = {
  links: [
    { id: 1, name: "Privacy Policy", path: "/privacy" },
    { id: 2, name: "Terms of Service", path: "/terms" },
    { id: 3, name: "About", path: "/about" },
    { id: 4, name: "Contact", path: "/contact" },
  ],
  message: "Blend Ocean Web App. All Rights Reserved.",
};

const learnMenuData = [
  {
    name: "Blender Tutorials",
    submenus: [
      { name: "New Tutorials" },
      { name: "Old Tutorials" }
    ]
  },
  {
    name: "VFX Tutorials",
    submenus: [
      { name: "New Tutorials" },
      { name: "Old Tutorials" }
    ]
  },
  {
    name: "Projects Files",
    submenus: [
      { name: "Download Files" }
    ]
  }
];

// Named exports for both constants
export { data, footer, learnMenuData };
