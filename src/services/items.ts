import { db, ItemCollection } from "@/lib/firebase";
import type { Item } from "@/types";
import { PagingSize } from "@/types/enum";
import {
  deleteDoc,
  doc,
  endAt,
  endBefore,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  startAt,
} from "firebase/firestore";

const collName = "items";

// Create items
export async function createItem(data: {
  part_number: string;
  part_name: string;
  category: string;
  uom: string;
  vendor: string;
}) {
  // Check if part_number already exists
  const existingItem = await getItemByPartNumber(data.part_number);
  if (existingItem) {
    throw new Error("Part number already exists");
  }

  const itemData: Item = {
    ...data,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };
  const itemRef = doc(db, collName, data.part_number);
  await setDoc(itemRef, itemData);
}

export async function updateItem(id: string, data: Partial<Item>) {
  const itemRef = doc(db, collName, id);
  await setDoc(itemRef, data, { merge: true });
}

export async function deleteItem(id: string) {
  const itemRef = doc(db, collName, id);
  await deleteDoc(itemRef);
}

export async function getItemByPartNumber(part_number: string) {
  const itemRef = doc(db, collName, part_number);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    return itemSnap.data() as Item;
  } else {
    return null;
  }
}

export async function getItemById(id: string) {
  const itemRef = doc(db, collName, id);
  const itemSnap = await getDoc(itemRef);
  if (itemSnap.exists()) {
    return itemSnap.data() as Item;
  } else {
    return null;
  }
}

export async function getItems() {
  const q = query(
    ItemCollection,
    limit(PagingSize),
    orderBy("created_at", "desc")
  );
  const itemSnap = await getDocs(q);
  return itemSnap.docs.map((doc) => doc.data() as Item);
}

export async function countItems(): Promise<number> {
  const snap = await getCountFromServer(ItemCollection);
  return snap.data().count;
}

export async function getItemsAfter(id: string): Promise<Item[]> {
  const document = await getDoc(doc(db, collName, id));
  const q = query(
    ItemCollection,
    orderBy("created_at", "desc"),
    startAfter(document),
    limit(PagingSize)
  );
  const itemSnap = await getDocs(q);
  return itemSnap.docs.map((doc) => doc.data() as Item);
}

export async function getItemsBefore(id: string): Promise<Item[]> {
  const document = await getDoc(doc(db, collName, id));
  const q = query(
    ItemCollection,
    orderBy("created_at", "desc"),
    endBefore(document),
    limitToLast(PagingSize)
  );
  const itemSnap = await getDocs(q);
  return itemSnap.docs.map((doc) => doc.data() as Item);
}

export async function searchItemsByPartName(
  queryText: string
): Promise<Item[]> {
  const q = query(
    ItemCollection,
    orderBy("part_name"),
    startAt(queryText),
    endAt(queryText + "\uf8ff"),
    limit(PagingSize)
  );
  const itemSnap = await getDocs(q);
  return itemSnap.docs.map((doc) => doc.data() as Item);
}
