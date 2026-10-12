"use client";
import AppTooltip from "@/components/ui/app-tooltip";
import { UserPlus } from "lucide-react";

export default function AddEmployeeButton() {
  return (
    <AppTooltip
      content="Добавить сотрудника"
      render={
        <button
          type="button"
          // onClick={() => addNewRow()}
          className="flex cursor-pointer items-center justify-center hover:text-black border rounded-md bg-border px-2 py-1.5"
        />
      }
    >
      <UserPlus size={16} className="text-red-600" strokeWidth={2} />
    </AppTooltip>
  );
}
