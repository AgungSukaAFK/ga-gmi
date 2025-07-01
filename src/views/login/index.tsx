import { LoginForm } from "@/components/login-form";
import { signIn } from "@/services/auth";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const result = await signIn({ email, password });
      if (result) {
        navigate("/dashboard");
      } else {
        throw new Error("Gagal login, silakan coba lagi.");
      }
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "Terjadi kesalahan yang tidak diketahui.");
      setError("");
    }
    setLoading(false);
  }, [error]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex w-full justify-center gap-2">
          <img src="gmi-logo.webp" alt="Logo GMI" className="dark:invert-100" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm loading={loading} onSubmit={handleLogin} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/wh2.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover brightness-40"
        />
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] select-none flex flex-col gap-4 items-center justify-center text-6xl font-extrabold text-white">
          <h1>WAREHOUSE</h1>
          <h1>MANAGEMENT</h1>
          <h1>SYSTEM</h1>
        </div>
      </div>
    </div>
  );
}
