# Deploy Orbit

1. Run npm ci, npm run type-check, npm run lint, npm run test:e2e, and npm run build.
2. Replace example.com, hello@example.com, and fictional content. Set the public site origin in .env (see README), then rebuild. Review image and reference licenses.
3. Deploy the project to a Next.js-compatible host, or run npm start behind your HTTPS reverse proxy. The server reads PORT if your platform sets it. Dynamic robots and sitemap use NEXT_PUBLIC_SITE_URL. Do not publish .env files or source maps containing private material.
4. Open /robots.txt, /sitemap.xml, /manifest.json, and /images/og-image.png to verify production metadata.
5. Smoke-test desktop, mobile, menu, FAQ, and enquiry on the deployed origin. Mailto requires a configured email client; the visible draft remains available to copy.

## Base paths

Assets and links use root-relative URLs. Deploy at the domain root. A subdirectory deployment requires updating router base, asset paths, manifest, and framework base configuration together.

## Forms and privacy

The demo stores no personal information in localStorage and sends no network request on form submission. A visitor explicitly opens and sends the draft using their email app. Connect and test your own backend before advertising automatic enquiry delivery. No payment or booking backend is included.
