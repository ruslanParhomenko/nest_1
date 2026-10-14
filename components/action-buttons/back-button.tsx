import { cn } from "@/lib/utils";
import { ArrowLeft, LogOut, PenBox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  className,
  disabled,
  size = 18,
}: {
  className?: string;
  disabled?: boolean;
  size?: number;
}) {
  const router = useRouter();

  return (
    <button
      disabled={disabled}
      type="button"
      onClick={() => router.back()}
      className={cn(
        className,
        "cursor-pointer hover:text-black bg-gray-300 border border-gray-300 px-2 py-1 rounded-md",
      )}
    >
      <ArrowLeft size={size} strokeWidth={2} />
    </button>
  );
}
