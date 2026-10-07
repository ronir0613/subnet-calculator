export type AddressClassification =
  | "Private"
  | "Public"
  | "Loopback"
  | "Link-local"
  | "Shared address space"
  | "Documentation"
  | "Benchmarking"
  | "Multicast"
  | "Reserved"
  | "Unspecified";

export type AddressType =
  | "Unicast"
  | "Unspecified"
  | "Loopback"
  | "Link-local"
  | "Multicast"
  | "Broadcast";

export interface SubnetResult {
  inputAddress: string;
  networkAddress: string;
  broadcastAddress: string | null;
  firstHost: string;
  lastHost: string;
  usableHosts: number;
  totalAddresses: number;
  subnetMask: string;
  wildcardMask: string;
  prefix: number;
  cidr: string;
  networkBits: number;
  hostBits: number;
  addressRange: { start: string; end: string };
  addressType: AddressType;
  classification: AddressClassification;
  binaryAddress: string;
  binaryNetwork: string;
  binaryMask: string;
  pointToPoint: boolean;
  singleAddress: boolean;
}

export class IPv4InputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IPv4InputError";
  }
}

const UINT32_MAX = 0xffff_ffffn;

export function ipv4ToInteger(value: string): bigint {
  const parts = value.trim().split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) {
    throw new IPv4InputError("Enter a valid IPv4 address, such as 192.168.1.0.");
  }

  let result = 0n;
  for (const part of parts) {
    const octet = Number(part);
    if (octet > 255) {
      throw new IPv4InputError("Each IPv4 number must be between 0 and 255.");
    }
    result = (result << 8n) | BigInt(octet);
  }
  return result;
}

export function isIPv4(value: string): boolean {
  try {
    ipv4ToInteger(value);
    return true;
  } catch {
    return false;
  }
}

export function integerToIPv4(value: bigint): string {
  if (value < 0n || value > UINT32_MAX) {
    throw new IPv4InputError("IPv4 address is outside the valid range.");
  }
  return [24n, 16n, 8n, 0n]
    .map((shift) => Number((value >> shift) & 255n))
    .join(".");
}

export function prefixToMask(prefix: number): string {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new IPv4InputError("CIDR prefix must be a whole number from 0 to 32.");
  }
  const mask = prefix === 0 ? 0n : (UINT32_MAX << BigInt(32 - prefix)) & UINT32_MAX;
  return integerToIPv4(mask);
}

export function maskToPrefix(mask: string): number {
  const value = ipv4ToInteger(mask);
  let prefix = 0;
  let sawZero = false;
  for (let bit = 31n; bit >= 0n; bit -= 1n) {
    const set = ((value >> bit) & 1n) === 1n;
    if (set && sawZero) {
      throw new IPv4InputError("Subnet mask must contain consecutive 1 bits.");
    }
    if (set) prefix += 1;
    else sawZero = true;
  }
  return prefix;
}

function parsePrefix(value: string): number {
  if (!/^\d{1,2}$/.test(value)) {
    throw new IPv4InputError("CIDR prefix must be a whole number from 0 to 32.");
  }
  const prefix = Number(value);
  if (prefix > 32) {
    throw new IPv4InputError("CIDR prefix must be between 0 and 32.");
  }
  return prefix;
}

export function parseSubnetInput(
  input: string,
  fallbackPrefix?: string | number,
): { address: string; prefix: number } {
  const value = input.trim();
  if (!value) {
    throw new IPv4InputError("Enter an IPv4 address and prefix, such as 192.168.1.0/24.");
  }

  const pieces = value.split(/\s+/);
  if (pieces.length > 2) {
    throw new IPv4InputError("Enter one IPv4 address and an optional subnet mask.");
  }

  const [addressAndPrefix, spaceMask] = pieces;
  const slashAt = addressAndPrefix.indexOf("/");
  let address = addressAndPrefix;
  let prefix: number | undefined;

  if (slashAt >= 0) {
    if (addressAndPrefix.indexOf("/", slashAt + 1) >= 0) {
      throw new IPv4InputError("Enter one CIDR prefix after the slash.");
    }
    address = addressAndPrefix.slice(0, slashAt);
    const prefixText = addressAndPrefix.slice(slashAt + 1);
    prefix = parsePrefix(prefixText);
  }

  // Validate the address before attempting to interpret any optional mask.
  ipv4ToInteger(address);

  if (spaceMask) {
    const maskPrefix = maskToPrefix(spaceMask);
    if (prefix !== undefined && prefix !== maskPrefix) {
      throw new IPv4InputError("The CIDR prefix and subnet mask do not match.");
    }
    prefix = maskPrefix;
  }

  if (prefix === undefined && fallbackPrefix !== undefined && fallbackPrefix !== "") {
    const fallback = String(fallbackPrefix);
    if (fallback.includes(".")) prefix = maskToPrefix(fallback);
    else prefix = parsePrefix(fallback);
  }

  if (prefix === undefined) {
    throw new IPv4InputError("Add a CIDR prefix, such as /24, or choose a prefix.");
  }

  return { address, prefix };
}

function binaryOctets(value: string): string {
  return value
    .split(".")
    .map((part) => Number(part).toString(2).padStart(8, "0"))
    .join(".");
}

function inRange(value: bigint, start: string, prefix: number): boolean {
  const address = ipv4ToInteger(start);
  const size = 1n << BigInt(32 - prefix);
  return value >= address && value < address + size;
}

export function classifyAddress(value: bigint): {
  addressType: AddressType;
  classification: AddressClassification;
} {
  if (value === 0n) return { addressType: "Unspecified", classification: "Unspecified" };
  if (value === UINT32_MAX) return { addressType: "Broadcast", classification: "Reserved" };
  if (inRange(value, "127.0.0.0", 8)) {
    return { addressType: "Loopback", classification: "Loopback" };
  }
  if (inRange(value, "169.254.0.0", 16)) {
    return { addressType: "Link-local", classification: "Link-local" };
  }
  if (inRange(value, "224.0.0.0", 4)) {
    return { addressType: "Multicast", classification: "Multicast" };
  }
  if (inRange(value, "10.0.0.0", 8) || inRange(value, "172.16.0.0", 12) || inRange(value, "192.168.0.0", 16)) {
    return { addressType: "Unicast", classification: "Private" };
  }
  if (inRange(value, "100.64.0.0", 10)) {
    return { addressType: "Unicast", classification: "Shared address space" };
  }
  if (
    inRange(value, "192.0.2.0", 24) ||
    inRange(value, "198.51.100.0", 24) ||
    inRange(value, "203.0.113.0", 24)
  ) {
    return { addressType: "Unicast", classification: "Documentation" };
  }
  if (inRange(value, "198.18.0.0", 15)) {
    return { addressType: "Unicast", classification: "Benchmarking" };
  }
  if (
    inRange(value, "0.0.0.0", 8) ||
    inRange(value, "192.0.0.0", 24) ||
    inRange(value, "192.88.99.0", 24) ||
    inRange(value, "240.0.0.0", 4)
  ) {
    return { addressType: "Unicast", classification: "Reserved" };
  }
  return { addressType: "Unicast", classification: "Public" };
}

export function calculateSubnet(input: string, fallbackPrefix?: string | number): SubnetResult {
  const { address, prefix } = parseSubnetInput(input, fallbackPrefix);
  const ip = ipv4ToInteger(address);
  const totalBig = 1n << BigInt(32 - prefix);
  const mask = prefix === 0 ? 0n : (UINT32_MAX << BigInt(32 - prefix)) & UINT32_MAX;
  const network = ip & mask;
  const last = network + totalBig - 1n;
  const pointToPoint = prefix === 31;
  const singleAddress = prefix === 32;
  const usableBig = pointToPoint ? 2n : singleAddress ? 1n : totalBig - 2n;
  const firstHost = pointToPoint || singleAddress ? network : network + 1n;
  const lastHost = pointToPoint || singleAddress ? last : last - 1n;
  const wildcard = UINT32_MAX ^ mask;
  const type = classifyAddress(ip);
  const networkAddress = integerToIPv4(network);
  const broadcastAddress = pointToPoint || singleAddress ? null : integerToIPv4(last);
  const subnetMask = integerToIPv4(mask);
  const binaryMask = binaryOctets(subnetMask);

  return {
    inputAddress: address,
    networkAddress,
    broadcastAddress,
    firstHost: integerToIPv4(firstHost),
    lastHost: integerToIPv4(lastHost),
    usableHosts: Number(usableBig),
    totalAddresses: Number(totalBig),
    subnetMask,
    wildcardMask: integerToIPv4(wildcard),
    prefix,
    cidr: `/${prefix}`,
    networkBits: prefix,
    hostBits: 32 - prefix,
    addressRange: { start: networkAddress, end: integerToIPv4(last) },
    addressType: type.addressType,
    classification: type.classification,
    binaryAddress: binaryOctets(address),
    binaryNetwork: binaryOctets(networkAddress),
    binaryMask,
    pointToPoint,
    singleAddress,
  };
}

export interface VlsmRequirement {
  name: string;
  hosts: number;
}

export interface VlsmAllocation extends VlsmRequirement {
  networkAddress: string;
  cidr: string;
  subnetMask: string;
  firstHost: string;
  lastHost: string;
  addressRange: { start: string; end: string };
  usableHosts: number;
  totalAddresses: number;
}

export interface VlsmResult {
  network: SubnetResult;
  allocations: VlsmAllocation[];
  remainingAddresses: number;
  remainingRange: { start: string; end: string } | null;
}

function prefixForHosts(hosts: number): number {
  if (!Number.isSafeInteger(hosts) || hosts < 1 || hosts > 4_294_967_294) {
    throw new IPv4InputError("Each subnet needs a whole number of hosts from 1 to 4,294,967,294.");
  }
  const requiredAddresses = BigInt(hosts <= 2 ? hosts : hosts + 2);
  let hostBits = 0;
  while ((1n << BigInt(hostBits)) < requiredAddresses) hostBits += 1;
  return 32 - hostBits;
}

export function calculateVlsm(networkInput: string, requirements: VlsmRequirement[]): VlsmResult {
  if (requirements.length === 0) {
    throw new IPv4InputError("Add at least one subnet requirement.");
  }
  const network = calculateSubnet(networkInput);
  const base = ipv4ToInteger(network.networkAddress);
  const networkEnd = ipv4ToInteger(network.addressRange.end);
  const ordered = requirements.map((requirement, index) => {
    const name = requirement.name.trim();
    if (!name) throw new IPv4InputError(`Add a name for subnet ${index + 1}.`);
    if (!Number.isSafeInteger(requirement.hosts) || requirement.hosts < 1) {
      throw new IPv4InputError(`Enter a whole number of hosts for ${name}.`);
    }
    const prefix = prefixForHosts(requirement.hosts);
    return { ...requirement, name, prefix, originalIndex: index };
  }).sort((a, b) => b.hosts - a.hosts || a.originalIndex - b.originalIndex);

  let cursor = base;
  const allocations: VlsmAllocation[] = ordered.map((requirement) => {
    const blockSize = 1n << BigInt(32 - requirement.prefix);
    const blockStart = (cursor + blockSize - 1n) / blockSize * blockSize;
    const blockEnd = blockStart + blockSize - 1n;
    if (blockEnd > networkEnd) {
      throw new IPv4InputError(
        `${requirement.name} needs a /${requirement.prefix} block; the requested subnets do not fit inside ${network.cidr}.`,
      );
    }

    const subnet = calculateSubnet(`${integerToIPv4(blockStart)}/${requirement.prefix}`);
    cursor = blockEnd + 1n;
    return {
      name: requirement.name,
      hosts: requirement.hosts,
      networkAddress: subnet.networkAddress,
      cidr: subnet.cidr,
      subnetMask: subnet.subnetMask,
      firstHost: subnet.firstHost,
      lastHost: subnet.lastHost,
      addressRange: subnet.addressRange,
      usableHosts: subnet.usableHosts,
      totalAddresses: subnet.totalAddresses,
    };
  });

  const remainingBig = networkEnd - cursor + 1n;
  return {
    network,
    allocations,
    remainingAddresses: Number(remainingBig > 0n ? remainingBig : 0n),
    remainingRange: remainingBig > 0n
      ? { start: integerToIPv4(cursor), end: integerToIPv4(networkEnd) }
      : null,
  };
}

export function formatAddressCount(count: number): string {
  return new Intl.NumberFormat("en-US").format(count);
}
