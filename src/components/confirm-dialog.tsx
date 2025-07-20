import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { create } from "zustand";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
};

const useConfirmDialog = create<{
  dialog: ConfirmDialogProps;
  show: (options: Omit<ConfirmDialogProps, "open">) => Promise<boolean>;
  hide: () => void;
}>((set) => ({
  dialog: { open: false },
  show: ({ title, description }) =>
    new Promise((resolve) => {
      set({
        dialog: {
          open: true,
          title,
          description,
          onConfirm: () => {
            resolve(true);
            set({ dialog: { open: false } });
          },
        },
      });
    }),
  hide: () => set({ dialog: { open: false } }),
}));

export const ConfirmDialog = () => {
  const { dialog, hide } = useConfirmDialog();
  return (
    <AlertDialog open={dialog.open} onOpenChange={(open) => !open && hide()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
          <AlertDialogDescription>{dialog.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => hide()}>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={dialog.onConfirm}>
            Ya, Lanjut
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Helper function to use globally
export const confirmDialog = (options: Omit<ConfirmDialogProps, "open">) =>
  useConfirmDialog.getState().show(options);
