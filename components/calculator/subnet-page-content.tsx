import { SubnetCalculator } from "@/components/calculator/subnet-calculator";
import { SiteHeader } from "@/components/site-header";
import { calculateSubnet, IPv4InputError } from "@/lib/networking/ipv4";
import Link from "next/link";

export type SubnetSearchParams = Promise<{ ip?: string | string[]; cidr?: string | string[] }>;

export async function SubnetPageContent({ searchParams }: { searchParams: SubnetSearchParams }) {
  const query = await searchParams;
  const inputIp = Array.isArray(query.ip) ? query.ip[0] : query.ip;
  const inputCidr = Array.isArray(query.cidr) ? query.cidr[0] : query.cidr;
  const initialInput = inputIp ?? "192.168.1.0";
  const initialPrefix = inputCidr && /^\d{1,2}$/.test(inputCidr) && Number(inputCidr) <= 32 ? inputCidr : "24";
  let initialResult = null;
  let initialError = null;

  try {
    initialResult = calculateSubnet(initialInput, inputCidr ?? initialPrefix);
  } catch (error) {
    initialError = error instanceof IPv4InputError ? error.message : "Check the address and prefix, then try again.";
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <SubnetCalculator
            initialInput={initialInput}
            initialPrefix={initialPrefix}
            initialResult={initialResult}
            initialError={initialError}
          />
        </div>
      </main>
      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <span>IPv4 subnet calculations run in your browser.</span>
          <Link className="hover:text-foreground" href="/guide">CIDR guide</Link>
        </div>
      </footer>
    </>
  );
}
