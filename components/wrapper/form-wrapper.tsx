"use client";
import { useFormId } from "@/hooks/use-form-id";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  onError?: (errors: any) => void;
  children: React.ReactNode;
  className?: string;
};

export default function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  onError,
  children,
  className,
}: FormWrapperProps<T>) {
  const formId = useFormId();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={className}
        id={formId}
      >
        {children}
      </form>
    </FormProvider>
  );
}
