import type { FieldValue, Timestamp } from "firebase/firestore";
import type { AuthProvider } from "./enum";
import type { User } from "firebase/auth";

export interface UserDb {
  id: string;
  email: string;
  nama: string;
  role: string;
  lokasi: string;
  email_verified: boolean;
  auth_provider: AuthProvider;
  image_url: string;
  created_at?: Timestamp | FieldValue;
  updated_at?: Timestamp | FieldValue;
}

export interface UserComplete extends User {
  id: string;
  email: string | null;
  nama: string;
  role: string;
  lokasi: string;
  email_verified: boolean;
  auth_provider: AuthProvider;
  image_url: string;
  created_at?: Timestamp | FieldValue;
  updated_at?: Timestamp | FieldValue;
}

export interface MaterialRequest {
  id?: string; // Sekaligus kode
  category: string;
  status: string;
  remarks: string;
  cost_estimation: number;
  user: string; // user.email
  department: string;
  created_at: Timestamp | FieldValue;
  updated_at: Timestamp | FieldValue;
}

export interface MRApproval {
  mr_id: string;
  type: string;
  status: string;
  user: string; // user.email
  created_at: Timestamp | FieldValue;
  updated_at: Timestamp | FieldValue;
}

export interface Logs {
  id?: string;
  user: string; // user.email
  type: string;
  title: string;
  description: string;
  link?: string;
  created_at: Timestamp | FieldValue;
  updated_at: Timestamp | FieldValue;
}
