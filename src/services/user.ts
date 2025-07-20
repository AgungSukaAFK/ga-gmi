import { db, UserCollection } from "@/lib/firebase";
import type { UserDb } from "@/types";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createlog } from "./logs";
import { handleError } from "@/lib/utils";
import { PagingSize } from "@/types/enum";

const userRef = collection(db, "users");

export async function getUserByEmail(
  email: string
): Promise<UserDb | undefined> {
  try {
    const q = query(UserCollection, where("email", "==", email));
    const res = await getDocs(q);
    if (res.empty) {
      throw new Error("User tidak ditemukan");
    }

    const user = res.docs[0].data() as UserDb;
    return user;
  } catch (err) {
    handleError(err);
  }
}

export async function getAllUsers({} = {}): Promise<UserDb[]> {
  try {
    const q = query(userRef, orderBy("created_at", "desc"), limit(PagingSize));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserDb[];
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export async function updateUser(user: Partial<UserDb>): Promise<boolean> {
  try {
    const docRef = doc(db, "users", user.id!);
    await updateDoc(docRef, {
      ...user,
      updated_at: serverTimestamp(),
    } as Partial<UserDb>);

    // Logging
    await createlog({
      user: user.email || "unknown",
      type: "User Activity",
      title: `Update User ${user.email}`,
      description: `User ${user.email} has been updated.`,
      link: `/users/${user.id}`,
    });

    return true;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`Failed to update user: ${error.message}`);
    } else {
      throw new Error("Failed to update user due to an unexpected error.");
    }
  }
}
