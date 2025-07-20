export const UserRole = ["admin", "requester", "approver"];

export const UserDepartment = [
  "General Affair",
  "Marketing",
  "Manufacture",
  "K3",
  "Finance",
  "IT",
  "Logistik",
  "Purchasing",
  "Warehouse",
  "Service",
  "General Manager",
  "Executive Manager",
  "Boards of Director",
  "Unassigned",
];

export type AuthProvider = "credential" | "google";

export type Lokasi = {
  nama: string;
  kode: string;
};

export const LokasiList: Lokasi[] = [
  { nama: "HEAD OFFICE", kode: "HO" },
  { nama: "TANJUNG ENIM", kode: "ENIM" },
  { nama: "BALIKPAPAN", kode: "BPN" },
  { nama: "SITE BA", kode: "BA" },
  { nama: "SITE TAL", kode: "TAL" },
  { nama: "SITE MIP", kode: "MIP" },
  { nama: "SITE MIFA", kode: "MIFA" },
  { nama: "SITE BIB", kode: "BIB" },
  { nama: "SITE AMI", kode: "AMI" },
  { nama: "SITE TABANG", kode: "TAB" },
  { nama: "unassigned", kode: "unassigned" },
];

export type LogType =
  | "User Activity"
  | "Material Request"
  | "Purchase Request"
  | "Purchase Order"
  | "Receive Item"
  | "Delivery";

export const DeliveryStatus = ["pending", "on delivery", "completed"];

export const DeliveryEkspedisi = [
  "JNE",
  "TIKI",
  "POS Indonesia",
  "J&T Express",
  "SiCepat",
  "Gojek",
  "Grab",
  "Hand Carry",
  "Lainnya",
  "Belum ditentukan",
];
export const PagingSize = 25;
