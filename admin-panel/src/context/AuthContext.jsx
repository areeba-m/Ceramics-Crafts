// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { login as authLogin, logout as authLogout } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('ceramicCraftsAdmin');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await authLogin(credentials);
      setUser(userData);
      localStorage.setItem('ceramicCraftsAdmin', JSON.stringify(userData));
      message.success('Login successful');
      navigate('/');
    } catch (error) {
      message.error(error.message);
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    localStorage.removeItem('ceramicCraftsAdmin');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);