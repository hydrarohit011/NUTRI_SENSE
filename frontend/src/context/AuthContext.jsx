import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('nutrisense_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading] = useState(false);

  useEffect(() => {
    // If we wanted to check a JWT backend ticket here, we could.
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const mockUser = { id: '1', name: email.split('@')[0], email, goal: 'Weight Loss' };
          localStorage.setItem('nutrisense_user', JSON.stringify(mockUser));
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject('Invalid credentials');
        }
      }, 1500);
    });
  };

  const signup = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('nutrisense_user', JSON.stringify(userData));
        setUser(userData);
        resolve(userData);
      }, 1500);
    });
  };

  const logout = () => {
    localStorage.removeItem('nutrisense_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
