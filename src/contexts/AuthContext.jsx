import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Password for development access - change this to your desired password
const DEV_PASSWORD = 'z1a';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage for authentication on initial load
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('z1a_dev_auth');
      setIsAuthenticated(authStatus === 'true');
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function to validate password
  const login = (password) => {
    if (password === DEV_PASSWORD) {
      localStorage.setItem('z1a_dev_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('z1a_dev_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
