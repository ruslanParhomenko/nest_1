import GoogleButton from "@/components/action-buttons/google-button";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center">loading...</div>
      }
    >
      <GoogleButton />
    </Suspense>
  );
}
