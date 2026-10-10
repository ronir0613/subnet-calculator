import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            Back to Calculator
          </Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
