"use client";
import FormWrapper from "@/components/wrapper/form-wrapper";
import type { GetEmployeesData } from "../model/schema";
import { useEmployeeForm } from "../hook/use-employee-form";
import EmployeeDataForm from "./employee-form";
import VacationForm from "./vacation-form";
import { useEdit } from "@/provider/edit-provider";
import { useEffect } from "react";

export function EmployeeCreatePage({
  id,
  employees,
}: {
  id?: string;
  employees: GetEmployeesData[] | null;
}) {
  const employee = id ? employees?.find((e) => e.id === id) : undefined;

  const { isEditing, setIsEditing } = useEdit();

  const { form, onSubmit } = useEmployeeForm({
    id,
  });

  useEffect(() => {
    if (employee) {
      form.reset(employee);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      return;
    }
    setIsEditing(true);
  }, []);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[38%_62%] mt-6 md:px-2">
        <EmployeeDataForm disabled={!isEditing} />
        <VacationForm disabled={!isEditing} />
      </div>
    </FormWrapper>
  );
}
