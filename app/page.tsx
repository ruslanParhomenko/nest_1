import GoogleButton from "@/components/action-buttons/google-button";
import { Warmup } from "@/components/page/warmup";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Warmup />
      <Suspense
        fallback={
          <div className="flex h-dvh items-center justify-center">
            loading...
          </div>
        }
      >
        <GoogleButton />
      </Suspense>
    </>
  );
}
