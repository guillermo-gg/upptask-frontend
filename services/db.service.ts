import { db } from "./firebase.service";

type User = {
  displayName: string;
  email: string;
  uid: string;
};

export const updateUser = (uid: string, userData: User): Promise<void> => {
  return db.collection("users").doc(uid).update(userData);
};

export const createUser = (uid: string, userData: User): Promise<void> => {
  return db
    .collection("users")
    .doc(uid)
    .set({ uid, ...userData }, { merge: true });
};
