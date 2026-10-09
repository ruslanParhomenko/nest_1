"use client";

import EditButton from "@/components/action-buttons/edit-button";
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
    <div className="bg-background flex items-center justify-start gap-6 py-4 px-4">
      {has("edit") && (
        <EditButton isEdit={isEditing} setIsEdit={setIsEditing} />
      )}
      {has("save") && isEditing && <SaveButton formId={formId} />}
    </div>
  );
}
