import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../configs/supabase";

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    checkAuthenticate();
  }, []);

  const login = async ({ email, password }) => {
    setExecuting(true);
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        return;
      }

      setIsAuthenticated(true);
      setUser(userData.user);
    } catch (error) {
      console.log(error);
    } finally {
      setExecuting(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
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
