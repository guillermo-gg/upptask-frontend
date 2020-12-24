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
  userId: string;
  user: User;
  loading: boolean;
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
  const [userId, setUserId] = useState<string>(null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Creates / Updates the user in Firestore on auth change.
  useEffect(
    () =>
      auth.onAuthStateChanged(async (newUser) => {
        if (newUser) {
          // Create / Update the user.
          await createUser(newUser.uid, getCleanUser(newUser));
          setUserId(newUser.uid);
        }
        setLoading(false);
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

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setUserId(null);
  };

  return (
    <authContext.Provider
      value={{
        userId,
        user,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
