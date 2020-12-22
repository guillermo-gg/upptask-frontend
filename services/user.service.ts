import { Dispatch, SetStateAction } from "react";
import { db } from "./firebase.service";

export type AuthUser = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

export interface User extends AuthUser {
  columnsId?: string;
}

const usersCollRef = db.collection("users");

/**
 * Creates / Updates a user in Firestore.
 */
export const createUser = async (uid: string, userData: User): Promise<void> =>
  // Update user data with new info from Auth.
  usersCollRef.doc(uid).set({ uid, ...userData }, { merge: true });

/**
 * Keeps user updated.
 */
export const syncUser = (
  uid: string,
  setUser: Dispatch<SetStateAction<User>>
) =>
  usersCollRef.doc(uid).onSnapshot((doc) => {
    if (!doc.exists) return;
    setUser(doc.data() as User);
  });

export const updateUserColumnsId = async (
  uid: string,
  newColumnsId: string
): Promise<void> => {
  return usersCollRef
    .doc(uid)
    .set({ columnsId: newColumnsId }, { merge: true });
};
