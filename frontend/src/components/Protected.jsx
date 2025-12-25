import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children, role }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setAuthData(data);
      } catch (err) {
        console.error("Auth error:", err);
        setAuthData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const interval = setInterval(fetchUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (authData?.success) {
    if (role && authData?.user?.role !== role) {
      return <Navigate to="*" />;
    }
    return children;
  }

  return <Navigate to="/login" />;
};

export default Protected;
