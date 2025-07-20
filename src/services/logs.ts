import { LogCollection } from "@/lib/firebase";
import { handleError } from "@/lib/utils";
import type { Logs } from "@/types";
import type { LogType } from "@/types/enum";
import { addDoc, serverTimestamp } from "firebase/firestore";

// Membuat log baru
export async function createlog(data: {
  user: string;
  type: LogType;
  title: string;
  description: string;
  link?: string;
}): Promise<void> {
  console.log("Creating log with data:", data);
  try {
    const logData: Logs = {
      user: data.user,
      type: data.type,
      title: data.title,
      description: data.description,
      link: data.link || "",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };

    await addDoc(LogCollection, logData);
  } catch (error) {
    handleError(error);
  }
}
