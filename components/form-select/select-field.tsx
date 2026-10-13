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
import { RotateCcw } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  fieldLabel?: string;
  placeHolder?: string;
  data: string[];
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
  onChange?: (value: string | null) => void;
  withOutBorder?: boolean;
};

export default function SelectField({
  fieldName,
  fieldLabel,
  placeHolder,
  data,
  disabled,
  className,
  orientation = "vertical",
  onChange,
  withOutBorder = false,
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => {
        const isDisabled = disabled || field.disabled;

        const setValue = (value: string | null) => {
          field.onChange(value);
          onChange?.(value);
        };

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={orientation}
            className="pb-2"
          >
            {fieldLabel && (
              <FieldLabel htmlFor={field.name}>{fieldLabel}</FieldLabel>
            )}

            <div className="relative w-full">
              <Select
                name={field.name}
                value={field.value ?? null}
                onValueChange={(value) => setValue(value)}
                disabled={isDisabled}
              >
                <SelectTrigger
                  id={fieldName}
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                  className={cn(
                    className,
                    "w-full [&>svg]:hidden",
                    field.value && "pr-9",
                    field.value &&
                      withOutBorder &&
                      "border-transparent shadow-none text-green-600 pl-4",
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

              {field.value && !isDisabled && !withOutBorder && (
                <button
                  type="button"
                  aria-label="reset"
                  onClick={() => setValue(null)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
