import { createContext, useContext, useState } from 'react';
import { loginSeller } from '../api/mockApi';

const AuthContext = createContext(null);
const KEY = 'seller-session-v1';

export function AuthProvider({ children }) {
  const [seller, setSeller] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(KEY));
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    const s = await loginSeller(email, password);
    setSeller(s);
    try {
      sessionStorage.setItem(KEY, JSON.stringify(s));
    } catch { /* ignore */ }
  };

  const logout = () => {
    setSeller(null);
    try {
      sessionStorage.removeItem(KEY);
    } catch { /* ignore */ }
  };

  return <AuthContext.Provider value={{ seller, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
