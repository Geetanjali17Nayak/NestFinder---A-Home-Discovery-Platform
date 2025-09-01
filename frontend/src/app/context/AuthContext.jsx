"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const checkUser = async () => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //     try {
    //       const userId = localStorage.getItem("user")
    //         ? JSON.parse(localStorage.getItem("user"))._id
    //         : null;
    //       if (userId) {
    //         const { data } = await api.get(`/api/users/getUserById/${userId}`);
    //         setUser(data);
    //       }
    //     } catch (err) {
    //       console.error("Could not fetch user", err);
    //       localStorage.removeItem("token");
    //     }
    //   }
    //   setLoading(false);
    // };

    const checkUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser?._id || parsedUser?.id || null;

      if (userId) {
        const { data } = await api.get(`/api/users/getUserById/${userId}`);
        setUser(data);
      } else {
        console.warn("User ID not found in localStorage.");
        setUser(null);
      }
    } catch (err) {
      console.error("Could not fetch user", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  } else {
    setUser(null);
  }
  setLoading(false);
};
    checkUser();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
