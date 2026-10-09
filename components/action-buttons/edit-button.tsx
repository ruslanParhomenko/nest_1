import { cn } from "@/lib/utils";
import { LogOut, PenBox } from "lucide-react";

export default function EditButton({
  className,
  isEdit,
  setIsEdit,
  size = 18,
}: {
  className?: string;
  disabled?: boolean;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  size?: number;
}) {
  return (
    <button
      type="button"
      onClick={() => setIsEdit(!isEdit)}
      className={cn(
        className,
        "cursor-pointer hover:text-black bg-gray-300 border border-gray-300 px-2 py-1 rounded-md",
      )}
    >
      {isEdit ? (
        <LogOut size={size} className="text-red-600" strokeWidth={2} />
      ) : (
        <PenBox size={size} className="text-blue-600" strokeWidth={2} />
      )}
    </button>
  );
}
