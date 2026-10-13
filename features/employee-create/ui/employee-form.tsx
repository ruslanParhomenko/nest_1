import SelectField from "@/components/form-select/select-field";
import { EMPLOYEES_ROLE } from "../model/constants";
import TextInput from "@/components/form-input/text-input";
import DateField from "@/components/date-input/date-input";

export default function EmployeeDataForm() {
  return (
    <div className="flex flex-col gap-6 md:w-2/3 md:px-6">
      <TextInput fieldName="fullName" fieldLabel="full name" type="text" />
      <SelectField
        data={EMPLOYEES_ROLE["restaurant"].map((r) => r.value)}
        fieldName="role"
        fieldLabel="role"
        className="bg-accent h-9!"
      />
      <TextInput fieldName="rate" fieldLabel="rate" type="number" />
      <TextInput fieldName="mail" fieldLabel="mail" type="email" />
      <TextInput fieldName="tel" fieldLabel="tel" type="tel" />

      <DateField
        fieldName="employmentDate"
        fieldLabel="employment date"
        className="bg-accent"
      />
    </div>
  );
}
