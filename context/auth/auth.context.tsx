import firebase from "firebase";
import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent,
} from "react";
import { AuthUser, createUser, syncUser, User } from "services/user.service";

import { auth } from "services/firebase.service";

type AuthContext = {
  user: User;
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
}: firebase.User): AuthUser => ({
  displayName,
  email,
  phoneNumber,
  photoURL,
  providerId,
  uid,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [userId, setUserId] = useState<string>();
  const [user, setUser] = useState<User>(null);

  // Creates / Updates the user in Firestore on auth change.
  useEffect(
    () =>
      auth.onAuthStateChanged((newUser) => {
        if (newUser) {
          // Create / Update the user.
          createUser(newUser.uid, getCleanUser(newUser)).then(() => {
            setUserId(newUser.uid);
          });
        }
      }),
    [user]
  );

  // Sets user for context on auth changes
  useEffect(() => {
    if (!userId) return;
    return syncUser(userId, setUser);
  }, [userId]);

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
