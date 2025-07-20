import { Content } from "@/components/layout/Content";
import WithSidebar from "@/components/layout/WithSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItem } from "@/services/items";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export default function TambahBarang() {
  const [loading, setLoading] = useState<boolean>(false);

  async function tambahBarang(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const part_number = formData.get("part_number") as string;
    const part_name = formData.get("part_name") as string;
    const category = formData.get("category") as string;
    const uom = formData.get("uom") as string;
    const vendor = formData.get("vendor") as string;

    try {
      setLoading(true);
      await createItem({
        part_name,
        part_number,
        category,
        uom,
        vendor,
      });
      toast.success("Barang berhasil ditambahkan");
      form.reset();
    } catch (error) {
      toast.error("Gagal menambahkan barang: " + error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <WithSidebar>
      <Content
        size="lg"
        title="Form Tambah Data Barang"
        description="Input data untuk menambakan data barang, Part Number tidak boleh sama."
        cardAction={
          <Button variant={"outline"} asChild>
            <a href="/barang">Ke halaman data barang</a>
          </Button>
        }
        cardFooter={
          <Button type="submit" form="form-tambah-barang" disabled={loading}>
            {loading ? "Loading..." : "Tambah Barang"}
          </Button>
        }
      >
        <form
          id="form-tambah-barang"
          className="grid grid-cols-12 gap-4"
          onSubmit={tambahBarang}
        >
          {/* Part Number */}
          <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
            <label htmlFor="part_number">Part Number</label>
            <Input type="text" name="part_number" required />
          </div>
          {/* Part Name */}
          <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
            <label htmlFor="part_name">Part Name</label>
            <Input type="text" name="part_name" required />
          </div>
          {/* Category */}
          <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
            <label htmlFor="category">Category</label>
            <Input type="text" name="category" required />
          </div>
          {/* UoM */}
          <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
            <label htmlFor="uom">Unit of Measurement</label>
            <Input type="text" name="uom" required />
          </div>
          {/* Vendor */}
          <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
            <label htmlFor="vendor">Vendor</label>
            <Input type="text" name="vendor" required />
          </div>
        </form>
      </Content>
    </WithSidebar>
  );
}
