import { ChevronDown, ChevronUp } from "lucide-react";
import { FieldArray, FieldValues, UseFieldArrayMove } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function MoveButton<T extends FieldValues>({
  rowIndex,
  fields,
  move,
  active = false,
  onMoved,
}: {
  rowIndex: number;
  fields: FieldArray<T>[];
  move: UseFieldArrayMove;
  active?: boolean;
  onMoved?: () => void;
}) {
  const base =
    "flex w-full flex-1 cursor-pointer items-center justify-center transition-opacity disabled:cursor-default";
  const opacity = active ? "opacity-100 disabled:opacity-30" : "opacity-15";

  return (
    <div className="flex h-full w-full flex-col">
      <button
        type="button"
        disabled={rowIndex === 0}
        onClick={() => {
          move(rowIndex, rowIndex - 1);
          onMoved?.();
        }}
        className={cn(base, opacity, "bg-blue-800")}
      >
        <ChevronUp className="size-3.5 text-white" />
      </button>
      <button
        type="button"
        disabled={rowIndex === fields.length - 1}
        onClick={() => {
          move(rowIndex, rowIndex + 1);
          onMoved?.();
        }}
        className={cn(base, opacity, "bg-red-800")}
      >
        <ChevronDown className="size-3.5 text-white" />
      </button>
    </div>
  );
}
