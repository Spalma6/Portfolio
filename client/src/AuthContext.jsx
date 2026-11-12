import { useMemo, useState } from "react";
import { apiRequest, auth } from "./api";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.getUser);

  const value = useMemo(() => ({
    user,
    isAdmin: user?.role === "admin",
    signIn: async (credentials) => {
      const data = await apiRequest("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      auth.saveToken(data.token);
      setUser(auth.getUser());
      return data;
    },
    signUp: async (details) => {
      const data = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(details),
      });
      auth.saveToken(data.token);
      setUser(auth.getUser());
      return data;
    },
    signOut: () => {
      auth.clear();
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
