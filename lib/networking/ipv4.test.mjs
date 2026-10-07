import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateSubnet,
  calculateVlsm,
  integerToIPv4,
  ipv4ToInteger,
  isIPv4,
  maskToPrefix,
  prefixToMask,
} from "./ipv4.ts";

test("parses IPv4 addresses and rejects invalid octets", () => {
  assert.equal(isIPv4("192.168.1.1"), true);
  assert.equal(ipv4ToInteger("255.255.255.255"), 4_294_967_295n);
  assert.equal(integerToIPv4(0n), "0.0.0.0");
  assert.equal(isIPv4("999.1.1.1"), false);
  assert.equal(isIPv4("192.168.1.999"), false);
  assert.equal(isIPv4("1.2.3"), false);
});

test("converts prefixes and validates contiguous subnet masks", () => {
  assert.equal(prefixToMask(24), "255.255.255.0");
  assert.equal(prefixToMask(0), "0.0.0.0");
  assert.equal(maskToPrefix("255.255.255.128"), 25);
  assert.throws(() => prefixToMask(33), /0 to 32/);
  assert.throws(() => maskToPrefix("255.0.255.0"), /consecutive/);
});

test("calculates a /24 network, host range, masks and address counts", () => {
  const result = calculateSubnet("192.168.1.0/24");
  assert.equal(result.networkAddress, "192.168.1.0");
  assert.equal(result.broadcastAddress, "192.168.1.255");
  assert.equal(result.firstHost, "192.168.1.1");
  assert.equal(result.lastHost, "192.168.1.254");
  assert.equal(result.usableHosts, 254);
  assert.equal(result.totalAddresses, 256);
  assert.equal(result.subnetMask, "255.255.255.0");
  assert.equal(result.wildcardMask, "0.0.0.255");
  assert.equal(result.classification, "Private");
  assert.equal(result.networkBits, 24);
  assert.equal(result.hostBits, 8);
});

test("accepts a host address and a space-separated subnet mask", () => {
  const fromHost = calculateSubnet("192.168.1.42/24");
  const fromMask = calculateSubnet("192.168.1.42 255.255.255.0");
  assert.equal(fromHost.networkAddress, "192.168.1.0");
  assert.equal(fromMask.cidr, "/24");
  assert.equal(calculateSubnet("10.0.0.1", 8).classification, "Private");
});

test("handles /0, /31, and /32 without signed bitwise errors or host subtraction", () => {
  const allIPv4 = calculateSubnet("0.0.0.0/0");
  assert.equal(allIPv4.networkAddress, "0.0.0.0");
  assert.equal(allIPv4.addressRange.end, "255.255.255.255");
  assert.equal(allIPv4.totalAddresses, 4_294_967_296);
  assert.equal(allIPv4.usableHosts, 4_294_967_294);

  const p2p = calculateSubnet("192.168.1.0/31");
  assert.equal(p2p.usableHosts, 2);
  assert.equal(p2p.firstHost, "192.168.1.0");
  assert.equal(p2p.lastHost, "192.168.1.1");
  assert.equal(p2p.broadcastAddress, null);

  const single = calculateSubnet("255.255.255.255/32");
  assert.equal(single.usableHosts, 1);
  assert.equal(single.firstHost, "255.255.255.255");
  assert.equal(single.lastHost, "255.255.255.255");
  assert.equal(single.broadcastAddress, null);

  const privateSingle = calculateSubnet("192.168.1.1/32");
  assert.equal(privateSingle.networkAddress, "192.168.1.1");
  assert.equal(privateSingle.usableHosts, 1);
  assert.equal(privateSingle.classification, "Private");
});

test("normalizes a host IP to /12 and /16 network boundaries", () => {
  const classBPrivate = calculateSubnet("172.16.12.34/12");
  assert.equal(classBPrivate.networkAddress, "172.16.0.0");
  assert.equal(classBPrivate.broadcastAddress, "172.31.255.255");
  assert.equal(classBPrivate.subnetMask, "255.240.0.0");
  assert.equal(classBPrivate.usableHosts, 1_048_574);

  const classCPrivate = calculateSubnet("192.168.12.34/16");
  assert.equal(classCPrivate.networkAddress, "192.168.0.0");
  assert.equal(classCPrivate.broadcastAddress, "192.168.255.255");
  assert.equal(classCPrivate.usableHosts, 65_534);
});

test("classifies public, private, link-local, loopback, multicast, and documentation ranges", () => {
  assert.equal(calculateSubnet("10.0.0.0/8").classification, "Private");
  assert.equal(calculateSubnet("172.16.0.0/12").classification, "Private");
  assert.equal(calculateSubnet("192.168.0.0/16").classification, "Private");
  assert.equal(calculateSubnet("8.8.8.8/32").classification, "Public");
  assert.equal(calculateSubnet("127.0.0.1/32").addressType, "Loopback");
  assert.equal(calculateSubnet("169.254.1.1/32").classification, "Link-local");
  assert.equal(calculateSubnet("224.0.0.1/32").addressType, "Multicast");
  assert.equal(calculateSubnet("192.0.2.1/32").classification, "Documentation");
});

test("rejects malformed IP, CIDR, and subnet masks with clear errors", () => {
  for (const input of ["999.1.1.1/24", "192.168.1.999/24", "hello", "192.168.1.1/33", "192.168.1.1/-1", "192.168.1.1 255.0.255.0"]) {
    assert.throws(() => calculateSubnet(input));
  }
  assert.throws(() => calculateSubnet("192.168.1.1"), /prefix/);
});

test("allocates VLSM subnets largest-first with masks, usable ranges and remaining space", () => {
  const result = calculateVlsm("192.168.1.0/24", [
    { name: "Engineering", hosts: 60 },
    { name: "Sales", hosts: 30 },
    { name: "Management", hosts: 14 },
    { name: "Servers", hosts: 6 },
  ]);
  assert.deepEqual(result.allocations.map(({ name, cidr, networkAddress }) => [name, cidr, networkAddress]), [
    ["Engineering", "/26", "192.168.1.0"],
    ["Sales", "/27", "192.168.1.64"],
    ["Management", "/28", "192.168.1.96"],
    ["Servers", "/29", "192.168.1.112"],
  ]);
  assert.equal(result.allocations[0].usableHosts, 62);
  assert.equal(result.remainingAddresses, 136);
  assert.deepEqual(result.remainingRange, { start: "192.168.1.120", end: "192.168.1.255" });
});

test("handles small VLSM host counts and rejects impossible allocations", () => {
  const small = calculateVlsm("192.168.1.0/29", [
    { name: "Device", hosts: 1 },
    { name: "Link", hosts: 2 },
  ]);
  assert.deepEqual(small.allocations.map(({ cidr, usableHosts }) => [cidr, usableHosts]), [["/31", 2], ["/32", 1]]);
  assert.equal(small.remainingAddresses, 5);
  assert.throws(() => calculateVlsm("192.168.1.0/28", [
    { name: "Engineering", hosts: 14 },
    { name: "Sales", hosts: 14 },
  ]), /do not fit/);
  assert.throws(() => calculateVlsm("192.168.1.0/24", []), /at least one/);
  assert.throws(() => calculateVlsm("192.168.1.0/24", [{ name: "", hosts: 2 }]), /name/);
});
