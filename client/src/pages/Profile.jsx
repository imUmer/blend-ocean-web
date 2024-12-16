import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { token, setToken } = useAuth();
  const user1 = token ? jwtDecode(token) : null;
  const [user, setUser] = useState(user1);

  console.log(user);
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken()
    window.location.href = "/login"; // Redirect to login page
  };

  
  return (
    <div>
       <h1>Profile</h1>
      <div>
        {user ? (
          <>
            <h1>Welcome, {user.name || "User"}</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}
