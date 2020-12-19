import firebase from "firebase";
import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent,
  useContext,
} from "react";

import { auth } from "services/firebase.service";

type User = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

type AuthContext = {
  user: User;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
};

export const authContext = createContext<AuthContext | null>(null);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth changes on mount, and unsubscribe on unmount.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return auth.signInWithPopup(provider);
  };

  const signOut = () => auth.signOut();

  return (
    <authContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
