import { EmployeeCreatePage } from "@/features/employee-create";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EmployeeCreatePage />
    </Suspense>
  );
}
