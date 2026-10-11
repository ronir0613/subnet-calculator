import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateSubnet, formatAddressCount } from "@/lib/networking/ipv4";
import { getMessages, type Locale } from "@/lib/i18n";

export function CidrReference({ locale = "en" }: { locale?: Locale }) {
  const copy = getMessages(locale);
  const rows = [24, 25, 26, 27, 28].map((prefix) => calculateSubnet(`192.168.1.0/${prefix}`));
  return (
    <div className="mt-5 overflow-x-auto">
      <Table aria-label={copy.cidrReference} className="min-w-[34rem]">
        <TableHeader>
          <TableRow>
            <TableHead>CIDR</TableHead>
            <TableHead>{copy.subnetMask}</TableHead>
            <TableHead>{copy.totalAddresses}</TableHead>
            <TableHead>{copy.usableHosts}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.cidr}>
              <TableCell className="font-mono">{row.cidr}</TableCell>
              <TableCell className="font-mono tabular-nums">{row.subnetMask}</TableCell>
              <TableCell className="font-mono tabular-nums">{formatAddressCount(row.totalAddresses)}</TableCell>
              <TableCell className="font-mono tabular-nums">{formatAddressCount(row.usableHosts)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
