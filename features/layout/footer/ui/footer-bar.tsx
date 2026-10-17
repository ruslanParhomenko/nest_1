"use client";

import AddEmployeeButton from "@/components/action-buttons/add-employee-button";
import BackButton from "@/components/action-buttons/back-button";
import EditButton from "@/components/action-buttons/edit-button";
import LogOutButton from "@/components/action-buttons/logout-button";
import SaveButton from "@/components/action-buttons/save-button";
import { ACTION_ITEM_BY_ROUTE } from "@/constants/action-item";
import { useFormId } from "@/hooks/use-form-id";
import { useEdit } from "@/provider/edit-provider";
import { usePathname } from "next/navigation";

export function FooterBar() {
  const pathname = usePathname();
  const mainRoute = pathname.split("/")[1] || "";

  const { isEditing, setIsEditing } = useEdit();
  const formId = useFormId();

  const actions = (ACTION_ITEM_BY_ROUTE[
    mainRoute as keyof typeof ACTION_ITEM_BY_ROUTE
  ] ?? []) as readonly string[];
  const has = (key: string) => actions.includes(key);

  return (
    <div className="bg-background flex items-center justify-between gap-6 pb-3 pt-1 px-4">
      <div className="flex items-center gap-4">
        {has("edit") && (
          <EditButton isEdit={isEditing} setIsEdit={setIsEditing} />
        )}
        {has("save") && isEditing && <SaveButton formId={formId} />}
        {has("add-employee") && (
          <AddEmployeeButton isEdit={isEditing} setIsEdit={setIsEditing} />
        )}
        {has("back") && <BackButton />}
      </div>
      <LogOutButton />
    </div>
  );
}
