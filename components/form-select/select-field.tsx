"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  fieldLabel?: string;
  placeHolder?: string;
  data: string[];
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

export default function SelectField({
  fieldName,
  fieldLabel,
  placeHolder,
  data,
  disabled,
  className,
  onChange,
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn(fieldLabel && "justify-items-start gap-2 pb-2")}
        >
          {fieldLabel && (
            <FieldLabel htmlFor={fieldName}>{fieldLabel}</FieldLabel>
          )}

          <Select
            name={field.name}
            value={field.value ?? ""}
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
                "flex w-full justify-start truncate bg-transparent! [&>svg]:hidden",
                className,
                field.value && "border-0 font-bold shadow-none",
              )}
            >
              <span className="block truncate">
                <SelectValue placeholder={placeHolder} />
              </span>
            </SelectTrigger>

            <SelectContent>
              {data.map((item, index) => (
                <SelectItem key={`${item}-${index}`} value={item}>
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
