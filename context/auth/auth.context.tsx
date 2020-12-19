import firebase from "firebase";
import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { createUser } from "services/db.service";

import { auth } from "services/firebase.service";

type FirebaseUser = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

type AuthContext = {
  user: FirebaseUser;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
};

export const authContext = createContext<AuthContext | null>(null);

const getCleanUser = ({
  displayName,
  email,
  phoneNumber,
  photoURL,
  providerId,
  uid,
}: firebase.User) => ({
  displayName,
  email,
  phoneNumber,
  photoURL,
  providerId,
  uid,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) createUser(user.uid, { ...user });
  }, [user]);

  // Subscribe to auth changes on mount, and unsubscribe on unmount.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser ? getCleanUser(newUser) : newUser);
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
