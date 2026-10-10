# Subnet.io - Advanced IP Network Calculator

Welcome to the **Subnet Calculator** project (available at [Subnetio.com](https://www.subnetio.com)), an elegant and robust networking utility designed for system administrators, network engineers, and IT professionals. 

Our goal is to demystify complex networking mathematics by providing an intuitive, lightning-fast suite of IP calculation tools.

---

## 🚀 Core Features

### 1. IPv4 Subnetting & CIDR Calculation
Instantly calculate crucial network parameters from any given IPv4 address and CIDR prefix. 
* **Precision Outputs:** Rapidly determines Network Address, Broadcast Address, First/Last Usable Host, Subnet Mask, Wildcard Mask, and Total Usable IPs.
* **Shareable Results:** Every calculation can be easily shared or bookmarked using URL query parameters (e.g., `?ip=192.168.1.0&cidr=24`).

### 2. Variable Length Subnet Masking (VLSM)
Advanced planning for multi-tiered network architectures.
* Allocate optimally-sized network segments from a single major IP block.
* Maximize address efficiency and prevent overlap across complex routing environments.

### 3. Ultimate Privacy (100% Client-Side)
Enterprise network layouts are highly sensitive. 
* **Zero Data Retention:** Our engine performs all complex logic entirely within the user's browser using JavaScript.
* **No Tracking:** We do not transmit, log, or store calculator inputs on external servers.

---

## 🛠 Technology Stack

This project is meticulously crafted to ensure performance, reliability, and an exceptional user experience:

* **Framework:** Next.js (App Router) & React
* **Language:** TypeScript (Strict typing for networking mathematical operations)
* **Styling:** Tailwind CSS v4 alongside a custom Radix UI design system for a highly accessible, responsive interface.
* **Engine:** Custom-built `lib/networking/ipv4.ts` functional pure-math engine.

---

## 🔒 Privacy & Data Policies

We believe in a bloat-free, secure experience:
* **Google Analytics Integration:** Implemented optimally via Next.js `<Script>` components to monitor basic traffic without impacting site performance.
* **Local Storage:** Used strictly for non-invasive UI state preservation (e.g., dark mode preferences). 

## 📬 Contact & Support

We are deeply committed to the professional IT community. For feature requests, technical support, or licensing inquiries, you can reach out through the official [Contact Page](https://www.subnetio.com/contact) or via the designated `CONTACT_EMAIL` in our deployment environments.
