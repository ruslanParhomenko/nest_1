"use client";
import AppTooltip from "@/components/ui/app-tooltip";
import { CalendarPlus, LogOut, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditScheduleButton({
  isEdit,
  setIsEdit,
}: {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

 const handleClick = () => {
  const query = searchParams.toString();

  router.push(`/schedule/edit${query ? `?${query}` : ""}`);
};
  const logout = () => {
    router.back();
    setIsEdit(false);
  };
  return (
    <AppTooltip
      content="Добавить"
      render={
        <button
          type="button"
          onClick={() => (isEdit ? logout() : handleClick())}
          className="flex cursor-pointer items-center justify-center hover:text-black border rounded-md bg-border px-2 py-1.5"
        />
      }
    >
      {isEdit ? (
        <LogOut size={16} className="text-red-600" strokeWidth={2} />
      ) : (
        <CalendarPlus size={16} className="text-red-600" strokeWidth={2} />
      )}
    </AppTooltip>
  );
}
