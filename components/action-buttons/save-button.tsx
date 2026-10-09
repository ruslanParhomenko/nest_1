import { cn } from "@/lib/utils";
import { SaveIcon } from "lucide-react";

export default function SaveButton({
  formId,
  className,
  size = 18,
}: {
  formId: string;
  className?: string;
  size?: number;
}) {
  return (
    <button
      form={formId}
      type="submit"
      className={cn(
        className,
        "cursor-pointer border border-gray-300 bg-gray-300 px-2 py-1 rounded-md",
      )}
    >
      <SaveIcon size={size} className="text-green-600" strokeWidth={2} />
    </button>
  );
}
