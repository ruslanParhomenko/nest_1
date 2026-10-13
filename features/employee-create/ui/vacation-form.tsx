"use client";
import DateField from "@/components/date-input/date-input";
import TextInput from "@/components/form-input/text-input";
import { Label } from "@/components/ui/label";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { defaultVacationForm } from "../model/schema";

const nameTag = "vacation";

export default function VacationForm({disabled}: {disabled?: boolean}) {
  const form = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: nameTag,
  });

  const updateCountDays = (
    index: number,
    start?: string | null,
    end?: string | null,
  ) => {
    const s = start ? parseISO(start) : null;
    const e = end ? parseISO(end) : null;

    const days =
      s && e && isValid(s) && isValid(e) && e >= s
        ? String(differenceInCalendarDays(e, s) + 1)
        : "";

    form.setValue(`${nameTag}.${index}.countDays`, days, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label>vacation pay</Label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="grid grid-cols-[38%_38%_9%_8%] md:gap-6 gap-1">
            <DateField
              fieldName={`${nameTag}.${index}.startDate`}
              orientation="horizontal"
              onChange={(value) =>
                updateCountDays(
                  index,
                  value,
                  form.getValues(`${nameTag}.${index}.endDate`),
                )
              }
              className="bg-accent"
              disabled={disabled}
            />
            <DateField
              fieldName={`${nameTag}.${index}.endDate`}
              fieldLabel="to"
              orientation="horizontal"
              onChange={(value) =>
                updateCountDays(
                  index,
                  form.getValues(`${nameTag}.${index}.startDate`),
                  value,
                )
              }
              className="bg-accent"
              disabled={disabled}
            />
            <TextInput
              fieldName={`${nameTag}.${index}.countDays`}
              withReset={false}
              disabled
              className="bg-accent md:w-12 w-9 text-center font-bold"
            />
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
              {index === 0 && (
                <button
                  type="button"
                  className="h-9 md:w-10 flex-none cursor-pointer"
                  onClick={() => append(defaultVacationForm)}
                  disabled={disabled}
                >
                  <Plus className="size-4 text-blue-600" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
