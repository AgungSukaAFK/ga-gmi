import { confirmDialog } from "@/components/confirm-dialog";
import { Content } from "@/components/layout/Content";
import WithSidebar from "@/components/layout/WithSidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUser } from "@/services/auth";
import { deleteItem, getItems } from "@/services/items";
import type { Item, UserComplete } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Barang() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Item[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [user, setUser] = useState<UserComplete | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getItems();
      setData(res);
    }

    fetchData();
  }, [refresh]);

  useEffect(() => {
    async function fetchUser() {
      const res = await getCurrentUser();
      setUser(res);
    }
    fetchUser();
  }, []);

  async function handleDelete(id: string) {
    const confirm = await confirmDialog({
      title: "Hapus Barang",
      description: "Apakah Anda yakin ingin menghapus barang ini?",
    });

    if (!confirm) {
      return;
    }

    try {
      setLoading(true);
      await deleteItem(id);
      setRefresh(!refresh);
      toast.success("Barang berhasil dihapus");
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <WithSidebar>
      <Content>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Part Number</TableHead>
              <TableHead>Part Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>UoM</TableHead>
              <TableHead>Vendor</TableHead>
              {user?.department === "Purchasing" && (
                <TableHead>Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-sm break-words whitespace-normal">
                  {item.part_number}
                </TableCell>
                <TableCell className="max-w-sm break-words whitespace-normal">
                  {item.part_name}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.uom}</TableCell>
                <TableCell>{item.vendor}</TableCell>
                {user?.department === "Purchasing" && (
                  <TableCell className="flex gap-2">
                    <Button
                      variant="destructive"
                      size={"sm"}
                      disabled={loading}
                      onClick={() => handleDelete(item.part_number)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </WithSidebar>
  );
}
