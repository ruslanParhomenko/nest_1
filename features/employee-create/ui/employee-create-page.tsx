"use client";
import FormWrapper from "@/components/wrapper/form-wrapper";
import { GetEmployeesData } from "../model/schema";
import { useEmployeeForm } from "../hook/use-employee-form";
import EmployeeDataForm from "./employee-form";
import VacationForm from "./vacation-form";
import { useEdit } from "@/provider/edit-provider";
import { use, useEffect } from "react";

export function EmployeeCreatePage({
  id,
  employees,
}: {
  id?: string;
  employees?: GetEmployeesData[];
}) {
  const employee = id ? employees?.find((e) => e.id === id) : undefined;

  const { setIsEditing } = useEdit();

  const { form, onSubmit } = useEmployeeForm({
    id,
  });

  const value = form.getValues();
  console.log(value);

  useEffect(() => {
    setIsEditing(true);
  }, []);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[38%_62%] mt-6 md:px-2">
        <EmployeeDataForm />
        <VacationForm />
      </div>
    </FormWrapper>
  );
}
