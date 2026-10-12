import AddEmployeeButton from "@/components/action-buttons/add-employee-button";
import AddRowButton from "@/components/action-buttons/add-row-button";

export function EditMenu({ addNewRow }: { addNewRow: () => void }) {
  return (
    <div className="bg-background flex items-center justify-start gap-6 px-4 py-4">
      <AddRowButton addNewRow={addNewRow} />
      <AddEmployeeButton />
    </div>
  );
}
