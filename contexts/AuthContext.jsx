import { createContext, useContext, useEffect, useState } from "react";
import client from "../configs/kinde";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);

  const checkAuthenticate = async () => {
    // Using `isAuthenticated` to check if the user is authenticated or not
    if (await client.isAuthenticated) {
      const user = await client.getUserDetails();
      
      setIsAuthenticated(true);
      setLoading(false);
      setUser(user);
        // Need to implement, e.g: call an api, etc...
    } else {
      setIsAuthenticated(false);
      setLoading(false);
        // Need to implement, e.g: redirect user to sign in, etc..
    }
};

  useEffect(() => {
    checkAuthenticate();
  }, []);

  const login = async () => {
    setExecuting(true);
    try {
      const user = await client.login();

      if(!user) {
        return;
      }
      
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      
    } finally {
      setExecuting(false);
    }
  };

  const logout = async () => {
    try {
      await client.logout();
      setIsAuthenticated(false);
    } catch (error) {
      
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading, executing }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
