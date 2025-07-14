import * as React from "react";
import {
  BaggageClaim,
  BookOpen,
  Bot,
  Boxes,
  FileBox,
  GalleryVerticalEnd,
  Info,
  LayoutDashboard,
  MessageSquareShare,
  Settings2,
  Warehouse,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useLocation } from "react-router-dom";

const data = {
  teams: [
    {
      name: "Lourdes Autoparts",
      logo: GalleryVerticalEnd,
      plan: "Versi 1.0.0",
    },
  ],
  navAdmin: [
    {
      title: "User Management",
      url: "/user-management",
      icon: Bot,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Material Request",
      url: "/material-request",
      icon: FileBox,
    },
    {
      title: "Purchase Order",
      url: "/purchase-order",
      icon: BaggageClaim,
    },
    {
      title: "Barang",
      url: "/barang",
      icon: Boxes,
    },
    {
      title: "Vendor",
      url: "/vendor",
      icon: Warehouse,
    },
    {
      title: "Setting",
      url: "/setting",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Dokumentasi",
      url: "/dokumentasi",
      icon: BookOpen,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquareShare,
    },
    {
      title: "Tentang App",
      url: "/tentang-app",
      icon: Info,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { avatar: string; email: string; nama: string; role?: string };
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Tambahkan isActive berdasarkan path saat ini
  const markActive = (items: typeof data.navMain) =>
    items.map((item) => ({
      ...item,
      isActive: currentPath === item.url,
    }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div>
          <img src="lourdes.png" alt="lourdes.png" className="drop-shadow-md" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {user.role === "admin" && (
          <NavMain label="Admin" items={markActive(data.navAdmin)} />
        )}
        <NavMain items={markActive(data.navMain)} />
        <NavMain label="About" items={markActive(data.navSecondary)} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: user.avatar,
            email: user.email,
            name: user.nama,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
