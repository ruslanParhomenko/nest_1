import { ChevronDown, ChevronUp } from "lucide-react";
import { UseFieldArrayMove } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function MoveButton({
  rowIndex,
  move,
  active = false,
  onMoved,
  isBottom,
  isTop,
}: {
  rowIndex: number;
  move: UseFieldArrayMove;
  active?: boolean;
  onMoved?: () => void;
  isBottom: boolean;
  isTop: boolean;
}) {
  const base =
    "flex w-full flex-1 cursor-pointer items-center justify-center transition-opacity disabled:cursor-default";
  const opacity = active ? "opacity-100 disabled:opacity-30" : "opacity-15";

  return (
    <div className="flex h-full w-full flex-col">
      {!isTop && (
        <button
          type="button"
          disabled={rowIndex === 0}
          onClick={() => {
            move(rowIndex, rowIndex - 1);
            onMoved?.();
          }}
          className={cn(base, opacity, "bg-blue-800")}
        >
          <ChevronUp className="size-3 text-white" />
        </button>
      )}
      {!isBottom && (
        <button
          type="button"
          onClick={() => {
            move(rowIndex, rowIndex + 1);
            onMoved?.();
          }}
          className={cn(base, opacity, "bg-red-800")}
        >
          <ChevronDown className="size-3 text-white" />
        </button>
      )}
    </div>
  );
}
