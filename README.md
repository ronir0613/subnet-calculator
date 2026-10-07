# Subnet Calculator

A small IPv4 networking utility built with Next.js, TypeScript, Tailwind CSS v4, and the Precision design system.

## Development

```bash
npm install
npm run dev
```

The main calculator is available at `/` and `/subnet`. Share links use `/subnet?ip=192.168.1.0&cidr=24`. VLSM allocations are at `/vlsm`; the CIDR guide is at `/guide`. About, Contact, Privacy, and Terms pages are also available. The theme selector saves a light or dark preference in the browser.

## Verification

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

The networking engine lives in `lib/networking/ipv4.ts`. Unit tests call these pure functions directly; they do not exercise the website UI.

## Deployment metadata

Set `NEXT_PUBLIC_SITE_URL` to the public site origin before deployment. It is used for canonical metadata, `sitemap.xml`, and `robots.txt`. The local development fallback is `http://localhost:3000`.

Set `CONTACT_EMAIL` to the public address that should receive messages from the Contact page. It is read by the server at request time. The form opens the visitor's email application; the site does not send or store messages.
