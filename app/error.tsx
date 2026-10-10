"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-red-500">Something went wrong!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          An unexpected error has occurred. Please try again later or refresh the page.
        </p>
        <Button onClick={() => reset()} size="lg" variant="default">
          Try again
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
