"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  placeHolder?: string;
  data: string[];
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

export default function SelectField({
  fieldName,
  placeHolder,
  data,
  disabled,
  className,
  onChange,
}: Props) {
  const { control } = useFormContext();

  const itemClassName =
    "data-selected:text-green-600! data-selected:focus:text-green-600 data-selected:data-highlighted:text-green-600 data-selected:**:text-green-600";

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Select
            name={field.name}
            value={field.value ?? null}
            onValueChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            disabled={disabled}
          >
            <SelectTrigger
              id={fieldName}
              aria-invalid={fieldState.invalid}
              onBlur={field.onBlur}
              className={cn(
                className,
                field.value &&
                  "border-transparent shadow-none text-green-600 [&>svg]:hidden pl-4",
              )}
            >
              <SelectValue placeholder={placeHolder} />
            </SelectTrigger>

            <SelectContent className="w-full p-2 [&>svg]:hidden">
              {data.map((item, index) => (
                <SelectItem
                  key={`${item}-${index}`}
                  value={item}
                  className={cn(
                    field.value === item &&
                      "text-green-600! focus:text-green-600! data-highlighted:text-green-600! **:text-green-600!",
                  )}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
