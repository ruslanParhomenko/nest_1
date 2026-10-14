"use client";

import { usePathname } from "next/navigation";
import { createContext, Suspense, useContext, useState } from "react";

interface EditContext {
  isEditing: boolean;
  setIsEditing: (edit: boolean) => void;
}

const EditContext = createContext<EditContext | null>(null);

const EDIT_PATHS = new Set<string>([]);

const EDIT_SEGMENTS = new Set(["create", "edit"]);

function EditProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mainRoute = "", ...rest] = pathname.split("/").filter(Boolean);

  const isEditRoute =
    EDIT_PATHS.has(mainRoute) || rest.some((s) => EDIT_SEGMENTS.has(s));

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

export default function EditProviderWithSuspense({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <EditProvider>{children}</EditProvider>
    </Suspense>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEdit must be used within a EditProvider");
  }
  return context;
}
