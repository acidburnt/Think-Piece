import React, { useState, createContext, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setUser] = useState({ user: null });
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setUser({ user: { uid: snapshot.id, ...snapshot.data() } });
        });
      }
      return setUser({ user: userAuth });
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  return (
    <UserContext.Provider value={state.user}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
