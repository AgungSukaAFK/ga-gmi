import { CircleX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <div className="text-4xl font-bold text-destructive flex items-center gap-4">
        404 <CircleX />
      </div>
      <div className="text-2xl font-semibold">Page Not Found</div>
      <div className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </div>
      <a href="/" className="mt-4 inline-block rounded px-6 py-2">
        Go to Home
      </a>
    </div>
  );
}
