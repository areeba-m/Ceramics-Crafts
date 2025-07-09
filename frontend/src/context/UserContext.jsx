import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        if (!userId || !token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:8081/api/users/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch user details"
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("cartKey");
          navigate("/login");
          toast.error("Session expired. Please login again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem(`claystore_cart_${userId}`);
      localStorage.removeItem("claystore_cart_guest");



      setUser(null);
      navigate("/login");

      toast.success("Logged out successfully", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useUser = () => useContext(UserContext);
