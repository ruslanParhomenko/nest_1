import { Plus } from "lucide-react";

export default function AddRowButton({
    addNewRow,
}: {
    addNewRow: () => void;
}) {
    return (
          <button
            type="button"
            onClick={() => addNewRow()}
            className="flex cursor-pointer items-center justify-center hover:text-black"
          >
            <Plus size={16} className="text-red-600" strokeWidth={2} />
          </button>
    )
}