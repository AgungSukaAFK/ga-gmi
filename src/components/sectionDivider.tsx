import { cn } from "@/lib/utils";

type Props = {
  simple?: boolean;
};

export default function SectionDivider({ simple = false }: Props) {
  return (
    <div
      className={cn(
        "col-span-12 my-4 h-px w-full bg-gray-200 dark:bg-gray-700",
        simple ? "m-0 h-0" : ""
      )}
    />
  );
}
