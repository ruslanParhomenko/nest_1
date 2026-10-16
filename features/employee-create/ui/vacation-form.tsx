"use client";
import DateField from "@/components/date-input/date-input";
import { Label } from "@/components/ui/label";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { defaultVacationForm, EmployeeForm } from "../model/schema";

const nameTag = "vacation";

export default function VacationForm({ disabled }: { disabled?: boolean }) {
  const form = useFormContext<EmployeeForm>();
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: nameTag,
  });

  const watched = useWatch({
    control: form.control,
    name: nameTag,
  });

  return (
    <div className="flex flex-col gap-6 mt-2">
      <div className="flex items-center gap-4">
        <Label>vacation pay</Label>
        <button
          type="button"
          className="h-9 md:w-10 flex-none cursor-pointer"
          onClick={() => append(defaultVacationForm)}
          disabled={disabled}
        >
          <Plus className="size-5 text-blue-600" strokeWidth={3} />
        </button>
      </div>
      {fields.map((field, index) => {
        const start = watched?.[index]?.startDate;
        const end = watched?.[index]?.endDate;

        const s = start ? parseISO(start) : null;
        const e = end ? parseISO(end) : null;

        const days =
          s && e && isValid(s) && isValid(e) && e >= s
            ? String(differenceInCalendarDays(e, s) + 1)
            : "";
        return (
          <div
            key={field.id}
            className="grid grid-cols-[38%_38%_9%_8%] md:gap-6 gap-2"
          >
            <DateField
              fieldName={`${nameTag}.${index}.startDate`}
              orientation="horizontal"
              className="bg-accent"
              disabled={disabled}
            />
            <DateField
              fieldName={`${nameTag}.${index}.endDate`}
              fieldLabel="to"
              orientation="horizontal"
              className="bg-accent"
              disabled={disabled}
            />
            <div className="flex items-center justify-center text-blue-600 font-bold">
              {days}
            </div>
            <div className="flex  items-center justify-start gap-3">
              <button
                type="button"
                className="h-9 md:w-10 flex-none cursor-pointer"
                onClick={() =>
                  fields.length === 1
                    ? replace(defaultVacationForm)
                    : remove(index)
                }
                disabled={disabled}
              >
                <Trash className="size-4 text-red-600" strokeWidth={2} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
