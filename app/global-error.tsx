"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center antialiased">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-destructive">Critical Error</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            A critical application error has occurred. We apologize for the inconvenience. Our team has been notified.
          </p>
          <Button onClick={() => reset()} size="lg" variant="default">
            Try to Recover
          </Button>
        </div>
      </body>
    </html>
  );
}
