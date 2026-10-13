import { z } from "zod";

// schema
export const vacationSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  countDays: z.string(),
});

export const employeesSchema = z.object({
  fullName: z.string().min(1, { message: "Name is required" }),
  mail: z.string(),
  tel: z.string(),
  role: z.string().min(1, { message: "Role is required" }),
  currentRate: z.string().min(1, { message: "Rate is required" }),
  employmentDate: z.string().nullable(),
  isActive: z.boolean(),
  vacation: z.array(vacationSchema),
});

// default
export const defaultVacationForm = {
  startDate: "",
  endDate: "",
  countDays: "",
};

export const defaultEmployeeForm: Partial<EmployeeForm> = {
  fullName: "",
  mail: "",
  tel: "",
  role: "",
  currentRate: "",
  employmentDate: "",
  isActive: true,
  vacation: [defaultVacationForm],
};

// types

export type EmployeeForm = z.infer<typeof employeesSchema>;

export type VacationForm = z.infer<typeof vacationSchema>;

export type GetEmployeesData = EmployeeForm & {
  id: string;
};
