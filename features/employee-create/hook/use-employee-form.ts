"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  defaultEmployeeForm,
  EmployeeForm,
  employeesSchema,
} from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEdit } from "@/provider/edit-provider";
import { createEmployee } from "../actions/create-employee";

export function useEmployeeForm({ id }: { id?: string }) {
  const { setIsEditing } = useEdit();

  const form = useForm<EmployeeForm>({
    resolver: zodResolver(employeesSchema),
    defaultValues: defaultEmployeeForm,
  });

  const onSubmit: SubmitHandler<EmployeeForm> = async (data) => {
    const { vacation, ...rest } = data;
    const payload = {
      ...rest,
      employmentDate: rest.employmentDate || null,
      vacation: vacation
        .filter((v) => v.startDate && v.endDate)
        .map(({ startDate, endDate }) => ({ startDate, endDate })),
    };
    try {
      if (id) {
        toast.success("Employee updated!");
      } else {
        await createEmployee(payload);
        toast.success("Employee added!");
      }

      setIsEditing(false);

      form.reset();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return {
    form,
    onSubmit,
  };
}
