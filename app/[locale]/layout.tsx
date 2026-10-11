import { notFound } from "next/navigation";
import { getMessages, isLocale, localeOptions } from "@/lib/i18n";
import { LocaleProvider } from "@/components/locale-provider";

export function generateStaticParams() {
  return localeOptions.map(({ code }) => ({ locale: code }));
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  return (
    <LocaleProvider locale={locale} messages={getMessages(locale)}>
      <div lang={locale === "zh" ? "zh-CN" : locale} dir={locale === "ar" ? "rtl" : "ltr"} className="flex min-h-full flex-1 flex-col">
        {props.children}
      </div>
    </LocaleProvider>
  );
}
