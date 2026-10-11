import { SubnetCalculator } from "@/components/calculator/subnet-calculator";
import { SiteHeader } from "@/components/site-header";
import { calculateSubnet, IPv4InputError } from "@/lib/networking/ipv4";
import { SiteFooter } from "@/components/site-footer";
import { SubnetSeoContent } from "@/components/calculator/subnet-seo-content";
import { getMessages, type Locale } from "@/lib/i18n";

export type SubnetSearchParams = Promise<{ ip?: string | string[]; cidr?: string | string[] }>;

export async function SubnetPageContent({ searchParams, locale = "en" }: { searchParams: SubnetSearchParams; locale?: Locale }) {
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
    initialError = locale === "en" && error instanceof IPv4InputError ? error.message : getMessages(locale).validation;
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SubnetCalculator
            initialInput={initialInput}
            initialPrefix={initialPrefix}
            initialResult={initialResult}
            initialError={initialError}
            locale={locale}
          />
          <SubnetSeoContent locale={locale} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
