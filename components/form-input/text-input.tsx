"use client";

import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type TextInputProps = {
  fieldName: string;
  fieldLabel?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  readonly?: boolean;
  withReset?: boolean;
};

function TextInput({
  fieldName,
  fieldLabel,
  placeholder,
  type,
  className,
  orientation = "vertical",
  disabled = false,
  readonly = false,
  withReset = true,
}: TextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue=""
      render={({ field, fieldState }) => {
        const hasValue =
          field.value !== "" && field.value != null && !disabled && !readonly;

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
              <Input
                {...field}
                id={field.name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readonly}
                aria-invalid={fieldState.invalid}
                className={cn("w-full h-9", hasValue && "pr-9", className)}
              />

              {hasValue && withReset && (
                <button
                  type="button"
                  onClick={() => field.onChange("")}
                  aria-label="reset"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
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

export default TextInput;
