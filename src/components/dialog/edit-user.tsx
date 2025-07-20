import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { UserDb } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { updateUser } from "@/services/user";
import type { Dispatch, SetStateAction } from "react";
import { LokasiList, UserDepartment, UserRole } from "@/types/enum";

interface MyDialogProps {
  onSubmit?: () => void;
  user: UserDb;
  refresh: Dispatch<SetStateAction<boolean>>;
}

export function EditUserDialog({ user, refresh }: MyDialogProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nama = formData.get("nama") as string;
    const role = formData.get("role") as string;
    const department = formData.get("department") as string;
    const lokasi = formData.get("lokasi") as string;
    if (!nama) {
      toast.warning("Nama tidak boleh kosong");
      return;
    }
    if (!role) {
      toast.warning("Nama tidak boleh kosong");
      return;
    }
    if (!lokasi) {
      toast.warning("Lokasi tidak boleh kosong");
      return;
    }

    if (
      nama === user.nama &&
      role === user.role &&
      department === user.department &&
      lokasi === user.lokasi
    ) {
      toast.warning("Tidak ada perubahan yang dilakukan");
      return;
    }

    // Update user
    try {
      const res = await updateUser({
        nama,
        role,
        department,
        lokasi,
        id: user.id,
      });
      if (res) {
        toast.success("User berhasil diupdate");
        refresh((prev) => !prev);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Gagal mengupdate user: ${error.message}`);
      } else {
        toast.error("Gagal mengupdate user");
      }
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Ubah informasi user seperti role dan lokasi
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} id="edit-user-form">
          <div className="grid gap-4">
            {/* Nama */}
            <div className="grid gap-3">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" name="nama" defaultValue={user.nama} />
            </div>
            {/* Email */}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                disabled
                defaultValue={user.email}
              />
            </div>
            {/* Role */}
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Select name="role" required defaultValue={user.role}>
                <SelectTrigger className="w-full" name="role" id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Daftar Role</SelectLabel>
                    {UserRole.map((role) => (
                      <SelectItem value={role}>{role}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Department */}
            <div className="grid gap-3">
              <Label htmlFor="department">Department</Label>
              <Select name="department" required defaultValue={user.department}>
                <SelectTrigger
                  className="w-full"
                  name="department"
                  id="department"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Daftar Departemen</SelectLabel>
                    {UserDepartment.map((department) => (
                      <SelectItem value={department}>{department}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Lokasi */}
            <div className="grid gap-3">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Select required name="lokasi" defaultValue={user.lokasi}>
                <SelectTrigger
                  className="w-full"
                  name="lokasi"
                  id="lokasi"
                  defaultValue={user.lokasi}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Daftar Lokasi</SelectLabel>
                    {LokasiList.map((lokasi) => (
                      <SelectItem value={lokasi.nama}>{lokasi.nama}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Batalkan</Button>
          </DialogClose>
          <Button type="submit" form="edit-user-form">
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
