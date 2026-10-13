"use client";
import AppTooltip from "@/components/ui/app-tooltip";
import { LogOut, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddEmployeeButton({
  isEdit,
  setIsEdit,
}: {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}) {
  const router = useRouter();

  const addNewRow = () => {
    router.push("/employee/create");
  };
  const logout = () => {
    router.back();
    setIsEdit(false);
  };
  return (
    <AppTooltip
      content="Добавить сотрудника"
      render={
        <button
          type="button"
          onClick={() => (isEdit ? logout() : addNewRow())}
          className="flex cursor-pointer items-center justify-center hover:text-black border rounded-md bg-border px-2 py-1.5"
        />
      }
    >
      {isEdit ? (
        <LogOut size={16} className="text-red-600" strokeWidth={2} />
      ) : (
        <UserPlus size={16} className="text-red-600" strokeWidth={2} />
      )}
    </AppTooltip>
  );
}
