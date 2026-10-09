"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface EditContext {
  isEditing: boolean;
  setIsEditing: (edit: boolean) => void;
}

const EditContext = createContext<EditContext | null>(null);

const EDIT_PATHS = new Set([]) as Set<string>;

export default function EditProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRoute = pathname.split("/")[1] || "";
  const isEditRoute = EDIT_PATHS.has(mainRoute);

  const [state, setState] = useState({
    pathname,
    isEdit: isEditRoute,
  });

  if (state.pathname !== pathname) {
    setState({
      pathname,
      isEdit: isEditRoute,
    });
  }

  const setIsEdit = (value: boolean) => {
    setState({
      pathname,
      isEdit: value,
    });
  };

  return (
    <EditContext value={{ isEditing: state.isEdit, setIsEditing: setIsEdit }}>
      {children}
    </EditContext>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEdit must be used within a EditProvider");
  }
  return context;
}
