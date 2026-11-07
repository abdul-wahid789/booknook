import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import SignUpContent from "./_components/SignUpContent";

export default function SignUpPage() {
  return (
    <main className="w-full bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Spinner className="h-6 w-6 text-primary" />
            </div>
          }
        >
          <SignUpContent />
        </Suspense>
      </div>
    </main>
  );
}