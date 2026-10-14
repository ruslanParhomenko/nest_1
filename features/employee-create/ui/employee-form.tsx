import SelectField from "@/components/form-select/select-field";
import { EMPLOYEES_ROLE } from "../model/constants";
import TextInput from "@/components/form-input/text-input";
import DateField from "@/components/date-input/date-input";

export default function EmployeeDataForm({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex flex-col gap-6 md:w-2/3 md:px-6">
      <TextInput
        fieldName="fullName"
        fieldLabel="full name"
        type="text"
        disabled={disabled}
      />
      <SelectField
        data={EMPLOYEES_ROLE["restaurant"].map((r) => r.value)}
        fieldName="role"
        fieldLabel="role"
        className="bg-accent h-9!"
        disabled={disabled}
      />
      <TextInput
        fieldName="currentRate"
        fieldLabel="current rate"
        type="number"
        disabled={disabled}
      />
      <TextInput
        fieldName="mail"
        fieldLabel="mail"
        type="email"
        disabled={disabled}
      />
      <TextInput
        fieldName="tel"
        fieldLabel="tel"
        type="tel"
        disabled={disabled}
      />

      <DateField
        fieldName="employmentDate"
        fieldLabel="employment date"
        className="bg-accent"
        disabled={disabled}
      />
    </div>
  );
}
