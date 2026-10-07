"use client";

import { useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { SubnetResult } from "@/lib/networking/ipv4";
import { calculateSubnet, formatAddressCount, IPv4InputError } from "@/lib/networking/ipv4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyValueButton } from "@/components/calculator/copy-value-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const primaryRows: { label: string; value: (result: SubnetResult) => string }[] = [
  { label: "Network address", value: (result) => result.networkAddress },
  {
    label: "Broadcast address",
    value: (result) => result.broadcastAddress ?? (result.pointToPoint ? "Not used on a /31 link" : "Not used for a /32"),
  },
  { label: "First usable host", value: (result) => result.firstHost },
  { label: "Last usable host", value: (result) => result.lastHost },
  { label: "Usable hosts", value: (result) => formatAddressCount(result.usableHosts) },
  { label: "Total addresses", value: (result) => formatAddressCount(result.totalAddresses) },
];

const detailRows: { label: string; value: (result: SubnetResult) => string }[] = [
  { label: "Subnet mask", value: (result) => result.subnetMask },
  { label: "Wildcard mask", value: (result) => result.wildcardMask },
  { label: "CIDR prefix", value: (result) => result.cidr },
  { label: "Network bits", value: (result) => String(result.networkBits) },
  { label: "Host bits", value: (result) => String(result.hostBits) },
  { label: "Address type", value: (result) => result.addressType },
  { label: "IP classification", value: (result) => result.classification },
  { label: "Address range", value: (result) => `${result.addressRange.start} – ${result.addressRange.end}` },
];

function ResultTable({
  rows,
  result,
}: {
  rows: typeof primaryRows;
  result: SubnetResult;
}) {
  return (
    <Table>
      <TableBody>
        {rows.map(({ label, value }) => {
          const text = value(result);
          return (
            <TableRow key={label}>
              <TableCell className="w-[43%] px-2 py-3 text-sm text-muted-foreground sm:w-1/2 sm:px-3">
                {label}
              </TableCell>
              <TableCell className="px-2 py-3 text-right sm:px-3">
                <div className="flex items-center justify-end gap-1 sm:gap-2">
                  <span className="min-w-0 break-all font-mono text-[0.8125rem] font-medium tabular-nums text-foreground sm:text-sm">
                    {text}
                  </span>
                  <CopyValueButton value={text} label={label.toLowerCase()} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function BitVisualization({ result }: { result: SubnetResult }) {
  return (
    <section aria-labelledby="bits-heading" className="border-t border-border pt-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="bits-heading" className="text-base font-semibold">Network and host bits</h2>
        <p className="font-mono text-xs tabular-nums text-muted-foreground">
          {result.networkBits} network · {result.hostBits} host
        </p>
      </div>
      <div
        className="mt-3 grid grid-cols-4 gap-2"
        role="img"
        aria-label={`${result.networkBits} network bits and ${result.hostBits} host bits`}
      >
        {Array.from({ length: 4 }, (_, octet) => (
          <span key={octet} aria-hidden="true" className="grid grid-cols-8 gap-1">
            {Array.from({ length: 8 }, (_, bit) => {
              const index = octet * 8 + bit;
              const isNetworkBit = index < result.networkBits;
              const rangeIndex = isNetworkBit ? index : index - result.networkBits;
              const rangeLength = isNetworkBit ? result.networkBits : result.hostBits;
              const progress = rangeLength <= 1 ? 0.5 : rangeIndex / (rangeLength - 1);
              const shade = Math.round(35 + progress * 65);
              return (
                <span
                  key={index}
                  className={`h-4 min-w-0 ${isNetworkBit ? "" : "border border-border"}`}
                  style={{
                    backgroundColor: isNetworkBit
                      ? `color-mix(in oklab, var(--primary) ${shade}%, var(--background))`
                      : "#ffffff",
                  }}
                />
              );
            })}
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Network</span>
        <span>Host</span>
      </div>
    </section>
  );
}

function ResultDetails({ result }: { result: SubnetResult }) {
  return (
    <Accordion type="multiple" className="grid items-start gap-x-6 border-t border-border lg:grid-cols-3">
      <AccordionItem value="details">
        <AccordionTrigger>Address details</AccordionTrigger>
        <AccordionContent>
          <ResultTable rows={detailRows} result={result} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="binary">
        <AccordionTrigger>Binary representation</AccordionTrigger>
        <AccordionContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            {[
              ["Address", result.binaryAddress],
              ["Network", result.binaryNetwork],
              ["Subnet mask", result.binaryMask],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="mb-1 text-xs text-muted-foreground">{label}</dt>
                <dd className="break-all font-mono text-xs leading-6 tabular-nums text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="method">
        <AccordionTrigger>How it is calculated</AccordionTrigger>
        <AccordionContent>
          <p>
            A {result.cidr} prefix fixes {result.networkBits} network bits. The network address is the entered IP AND the subnet mask; the remaining {result.hostBits} bits identify addresses inside the subnet.
          </p>
          {result.pointToPoint && <p className="mt-2">A /31 link uses both addresses as hosts, so it has no broadcast address.</p>}
          {result.singleAddress && <p className="mt-2">A /32 describes one host address and has no separate broadcast address.</p>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function SubnetCalculator({
  initialInput,
  initialPrefix,
  initialResult,
  initialError,
}: {
  initialInput: string;
  initialPrefix: string;
  initialResult: SubnetResult | null;
  initialError: string | null;
}) {
  const pathname = usePathname();
  const [input, setInput] = useState(initialInput);
  const [prefix, setPrefix] = useState(initialPrefix);
  const [result, setResult] = useState(initialResult);
  const [error, setError] = useState(initialError);
  const [copyMessage, setCopyMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const next = calculateSubnet(input, prefix);
      setResult(next);
      setPrefix(String(next.prefix));
      setError(null);
      setCopyMessage("");
      const params = new URLSearchParams({ ip: next.inputAddress, cidr: String(next.prefix) });
      window.history.replaceState(null, "", `/subnet?${params.toString()}`);
    } catch (cause) {
      setError(cause instanceof IPv4InputError ? cause.message : "Check the address and prefix, then try again.");
      inputRef.current?.focus();
    }
  }

  function clear() {
    setInput("");
    setPrefix("24");
    setResult(null);
    setError(null);
    setCopyMessage("");
    window.history.replaceState(null, "", pathname === "/subnet" ? "/subnet" : "/");
    inputRef.current?.focus();
  }

  async function copyAll() {
    if (!result) return;
    const lines = [
      `Subnet: ${result.inputAddress}${result.cidr}`,
      `Network: ${result.networkAddress}`,
      `Broadcast: ${result.broadcastAddress ?? "Not applicable"}`,
      `First Host: ${result.firstHost}`,
      `Last Host: ${result.lastHost}`,
      `Usable Hosts: ${result.usableHosts}`,
      `Subnet Mask: ${result.subnetMask}`,
      `Wildcard Mask: ${result.wildcardMask}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyMessage("Results copied.");
    } catch {
      setCopyMessage("Clipboard unavailable. Copy values one at a time.");
    }
    window.setTimeout(() => setCopyMessage(""), 2200);
  }

  return (
    <>
      <section className="pt-10 sm:pt-14" aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">Subnet Calculator</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Calculate IPv4 network addresses, subnet masks, host ranges, and CIDR details instantly.
        </p>
      </section>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] xl:gap-10">
        <section className="min-w-0" aria-labelledby="input-title">
          <Card>
            <CardHeader className="p-5 pb-3">
              <h2 id="input-title" className="text-base font-semibold">Subnet input</h2>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <form onSubmit={submit} noValidate>
                <div className="grid grid-cols-2 items-end gap-3">
                  <div className="col-span-2 min-w-0">
                    <label htmlFor="subnet-input" className="mb-2 block text-sm font-medium">IPv4 address or CIDR</label>
                    <Input
                      ref={inputRef}
                      id="subnet-input"
                      name="ip"
                      value={input}
                      onChange={(event) => { setInput(event.target.value); setError(null); }}
                      placeholder="192.168.1.0/24"
                      autoComplete="off"
                      spellCheck={false}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "subnet-error" : "subnet-hint"}
                      className="h-11 font-mono text-base tabular-nums"
                    />
                    <p id="subnet-hint" className="mt-1.5 text-xs text-muted-foreground">CIDR or IP with a subnet mask</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">Examples:</span>
                      {[
                        { label: "Class A", value: "10.0.0.0/8" },
                        { label: "Class B", value: "172.16.0.0/16" },
                        { label: "Class C", value: "192.168.1.0/24" },
                        { label: "Localhost", value: "127.0.0.1/8" },
                      ].map((ex) => (
                        <Button
                          key={ex.label}
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            setInput(ex.value);
                            setError(null);
                            inputRef.current?.focus();
                          }}
                        >
                          {ex.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="subnet-prefix" className="mb-2 block text-sm font-medium">Prefix if omitted</label>
                    <Select value={prefix} onValueChange={setPrefix}>
                      <SelectTrigger id="subnet-prefix" aria-label="CIDR prefix" className="h-11 w-full bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-72">
                        {Array.from({ length: 33 }, (_, value) => (
                          <SelectItem key={value} value={String(value)}>/{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" size="lg" className="h-11 w-full px-3">Calculate</Button>
                  <Button type="button" variant="outline" size="lg" className="col-span-2 h-11 w-full px-4" onClick={clear}>Clear</Button>
                </div>
                {error && <p id="subnet-error" role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="min-w-0" aria-labelledby="results-title">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3 border-b border-border p-5">
              <h2 id="results-title" aria-live="polite" aria-atomic="true" className="min-w-0 text-lg font-semibold">Results {result && <span className="font-mono text-base font-medium text-muted-foreground">{result.networkAddress}{result.cidr}</span>}</h2>
              {result && <Button type="button" variant="secondary" size="sm" className="min-h-11 shrink-0 px-4" onClick={copyAll}>Copy all</Button>}
            </CardHeader>
            <CardContent className="p-5">
              {result ? (
                <>
                  <ResultTable rows={primaryRows} result={result} />
                  {copyMessage && <p className="mt-2 text-xs text-muted-foreground" role="status">{copyMessage}</p>}
                </>
              ) : (
                <p className="py-8 text-sm text-muted-foreground">Enter an IPv4 address to see its subnet results.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {result && (
        <section className="mt-12 border-t border-border pt-8" aria-labelledby="details-title">
          <h2 id="details-title" className="text-xl font-semibold tracking-tight">More subnet details</h2>
          <div className="mt-5 max-w-5xl">
            <BitVisualization result={result} />
          </div>
          <div className="mt-5 max-w-5xl">
            <ResultDetails result={result} />
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-border pt-8" aria-labelledby="reference-title">
        <h2 id="reference-title" className="text-xl font-semibold tracking-tight">What is a subnet?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          A subnet is a smaller network range inside a larger IP network. A prefix such as /24 marks how many bits identify the network.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="border-t border-border pt-3">
            <h3 className="text-sm font-medium">Keep learning</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
              <li><a className="text-primary underline-offset-4 hover:underline" href="https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/" rel="noopener noreferrer" target="_blank">Cloudflare: What is a subnet?</a></li>
              <li><a className="text-primary underline-offset-4 hover:underline" href="https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html" rel="noopener noreferrer" target="_blank">Cisco: IP addressing and subnetting</a></li>
              <li><a className="text-primary underline-offset-4 hover:underline" href="https://www.rfc-editor.org/info/rfc4632" rel="noopener noreferrer" target="_blank">IETF: CIDR technical reference (RFC 4632)</a></li>
            </ul>
          </div>
          <div className="border-t border-border pt-3">
            <h3 className="text-sm font-medium">More subnet tools</h3>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link className="text-primary underline-offset-4 hover:underline" href="/vlsm">VLSM calculator</Link>
              <Link className="text-primary underline-offset-4 hover:underline" href="/guide">Subnet guides</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
