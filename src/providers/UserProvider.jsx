import React, { useState, createContext, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      console.log(user);
      return setUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
