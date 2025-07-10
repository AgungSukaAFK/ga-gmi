import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/index.tsx";
import Dashboard from "./views/dashboard/index.tsx";
import Setting from "./views/setting/index.tsx";
import TentangApp from "./views/tentang-app/index.tsx";
import UserManagement from "./views/user-management/index.tsx";
import NotFound from "./views/not-found/index.tsx";
import Register from "./views/register/index.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import VerifyEmailPage from "./views/verify-email/index.tsx";
import PendingApprovalPage from "./views/unassigned/index.tsx";
import ForgetPassword from "./views/forget-password/index.tsx";
import MaterialRequest from "./views/material-request/index.tsx";
import PurchaseOrder from "./views/purchase-order/index.tsx";
import Barang from "./views/barang/index.tsx";
import Vendor from "./views/vendor/index.tsx";
import Docs from "./views/docs/index.tsx";
import Feedback from "./views/feedback/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster richColors closeButton theme="system" />

    <BrowserRouter>
      <Routes>
        {/* AUTH */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/not-verified" element={<VerifyEmailPage />} />

        <Route path="/verify-email" element={<VerifyEmailPage />} />

        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/unassigned" element={<PendingApprovalPage />} />

        {/* END AUTH */}

        {/* MENU */}

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/material-request" element={<MaterialRequest />} />

        <Route path="/purchase-order" element={<PurchaseOrder />} />

        <Route path="/barang" element={<Barang />} />

        <Route path="/vendor" element={<Vendor />} />

        <Route path="/setting" element={<Setting />} />

        <Route path="/dokumentasi" element={<Docs />} />

        <Route path="/tentang-app" element={<TentangApp />} />

        <Route path="/feedback" element={<Feedback />} />

        <Route path="/user-management" element={<UserManagement />} />

        {/* END MENU */}

        {/* HOMEPAGE */}
        <Route path="/" element={<App />} />

        {/* NOT FOUND PAGE HANDLER */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
