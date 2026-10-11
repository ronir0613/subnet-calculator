"use client";

import { useState, type FormEvent } from "react";
import { calculateVlsm, formatAddressCount, IPv4InputError, type VlsmRequirement, type VlsmResult } from "@/lib/networking/ipv4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Locale } from "@/lib/i18n";
import { useLocale } from "@/components/locale-provider";

const starterRequirements: VlsmRequirement[] = [
  { name: "Engineering", hosts: 60 },
  { name: "Sales", hosts: 30 },
  { name: "Management", hosts: 14 },
  { name: "Servers", hosts: 6 },
];

const starterNames: Partial<Record<Locale, string[]>> = {
  zh: ["工程", "销售", "管理", "服务器"],
  es: ["Ingeniería", "Ventas", "Gestión", "Servidores"],
  ar: ["الهندسة", "المبيعات", "الإدارة", "الخوادم"],
  id: ["Teknik", "Penjualan", "Manajemen", "Server"],
  pt: ["Engenharia", "Vendas", "Gestão", "Servidores"],
  fr: ["Ingénierie", "Ventes", "Gestion", "Serveurs"],
};

function initialRequirements(locale: Locale) {
  const names = starterNames[locale];
  return names ? starterRequirements.map((item, index) => ({ ...item, name: names[index] })) : starterRequirements;
}

function initialResult(requirements: VlsmRequirement[]): VlsmResult | null {
  try {
    return calculateVlsm("192.168.1.0/24", requirements);
  } catch {
    return null;
  }
}

export function VlsmCalculator({ locale = "en" }: { locale?: Locale }) {
  const { copy } = useLocale();
  const [network, setNetwork] = useState("192.168.1.0/24");
  const [requirements, setRequirements] = useState(() => initialRequirements(locale));
  const [result, setResult] = useState<VlsmResult | null>(() => initialResult(initialRequirements(locale)));
  const [error, setError] = useState<string | null>(null);

  function updateRequirement(index: number, field: "name" | "hosts", value: string) {
    setRequirements((current) => current.map((item, position) => {
      if (position !== index) return item;
      if (field === "name") return { ...item, name: value };
      return { ...item, hosts: value === "" ? 0 : Number(value) };
    }));
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setResult(calculateVlsm(network, requirements));
      setError(null);
    } catch (cause) {
      setResult(null);
      setError(locale === "en" && cause instanceof IPv4InputError ? cause.message : copy.validation);
    }
  }

  return (
    <>
      <section className="pt-10 sm:pt-14" aria-labelledby="vlsm-title">
        <h1 id="vlsm-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.vlsmTitle}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          {copy.vlsmIntro}
        </p>
      </section>

      <form className="mt-8 space-y-7" onSubmit={calculate} noValidate>
        <div className="max-w-sm">
          <label htmlFor="vlsm-network" className="mb-2 block text-sm font-medium">{copy.network}</label>
          <Input
            id="vlsm-network"
            dir="ltr"
            value={network}
            onChange={(event) => setNetwork(event.target.value)}
            placeholder="192.168.1.0/24"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            className="h-11 font-mono tabular-nums"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-semibold">{copy.requirements}</legend>
          <div className="mt-3 divide-y divide-border border-y border-border">
            {requirements.map((requirement, index) => (
              <div key={index} className="grid min-w-0 grid-cols-[minmax(0,1fr)_6.5rem_auto] items-end gap-3 py-3 max-[359px]:grid-cols-[minmax(0,1fr)_6.5rem] sm:max-w-2xl sm:grid-cols-[minmax(0,1fr)_8rem_auto]">
                <div className="min-w-0">
                  <label htmlFor={`requirement-name-${index}`} className="mb-1.5 block text-xs text-muted-foreground">{copy.subnetName}</label>
                  <Input
                    id={`requirement-name-${index}`}
                    value={requirement.name}
                    onChange={(event) => updateRequirement(index, "name", event.target.value)}
                    autoComplete="off"
                    className="h-11"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor={`requirement-hosts-${index}`} className="mb-1.5 block text-xs text-muted-foreground">{copy.hosts}</label>
                  <Input
                    id={`requirement-hosts-${index}`}
                    value={requirement.hosts || ""}
                    onChange={(event) => updateRequirement(index, "hosts", event.target.value)}
                    inputMode="numeric"
                    autoComplete="off"
                    className="h-11 font-mono tabular-nums"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="min-h-11 justify-self-start px-2 max-[359px]:col-span-2 sm:justify-self-auto"
                  onClick={() => setRequirements((current) => current.filter((_, position) => position !== index))}
                  aria-label={`${copy.removeRequirement} ${requirement.name || `${copy.subnet} ${index + 1}`}`}
                >
                  {copy.removeRequirement}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-11"
              onClick={() => setRequirements((current) => [...current, { name: "", hosts: 0 }])}
            >
              {copy.addRequirement}
            </Button>
            <Button type="submit" size="lg" className="h-11">{copy.allocate}</Button>
          </div>
        </fieldset>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </form>

      {result && (
        <section className="mt-10" aria-labelledby="allocations-title" aria-live="polite">
          <div className="mb-6 flex flex-col gap-4">
            <h2 id="allocations-title" className="text-lg font-semibold">{copy.allocations}</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <div className="text-xs font-medium text-muted-foreground">{copy.totalAddresses}</div>
                <div className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-foreground">
                  {formatAddressCount(result.network.totalAddresses)}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <div className="text-xs font-medium text-muted-foreground">{copy.usedAddresses}</div>
                <div className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-foreground">
                  {formatAddressCount(result.network.totalAddresses - result.remainingAddresses)}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <div className="text-xs font-medium text-muted-foreground">{copy.unusedAddresses}</div>
                <div className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-foreground">
                  {formatAddressCount(result.remainingAddresses)}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <div className="text-xs font-medium text-muted-foreground">{copy.allocatedHosts}</div>
                <div className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-foreground">
                  {formatAddressCount(result.allocations.reduce((sum, alloc) => sum + alloc.usableHosts, 0))}
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table aria-label={copy.allocations} className="min-w-[46rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>{copy.subnet}</TableHead>
                  <TableHead>{copy.network}</TableHead>
                  <TableHead>{copy.mask}</TableHead>
                  <TableHead>{copy.usableHosts}</TableHead>
                  <TableHead>{copy.hostRange}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.allocations.map((allocation) => (
                  <TableRow key={`${allocation.name}-${allocation.networkAddress}`}>
                    <TableCell>
                      <span className="block font-medium">{allocation.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{allocation.hosts} {copy.requested} · {allocation.cidr}</span>
                    </TableCell>
                    <TableCell className="font-mono text-xs tabular-nums">{allocation.networkAddress}</TableCell>
                    <TableCell className="font-mono text-xs tabular-nums">{allocation.subnetMask}</TableCell>
                    <TableCell className="font-mono tabular-nums">{formatAddressCount(allocation.usableHosts)}</TableCell>
                    <TableCell className="font-mono text-xs tabular-nums">{allocation.firstHost} – {allocation.lastHost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {result.remainingRange && (
            <p className="mt-3 break-words text-sm text-muted-foreground">
              {copy.remainingRange}: <span className="font-mono tabular-nums text-foreground" dir="ltr">{result.remainingRange.start} – {result.remainingRange.end}</span>
            </p>
          )}
        </section>
      )}
    </>
  );
}
