import type { NextConfig } from "next";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://us-central1-karmiccompass.cloudfunctions.net https://*.run.app",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Serve the published .md governance artefacts as readable inline text
      // (so /privacy/DPIA etc. display in-browser instead of downloading).
      { source: "/privacy/:doc*", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] },
    ];
  },
  async rewrites() {
    return [
      { source: "/privacy", destination: "/privacy.html" },
      { source: "/terms",   destination: "/terms.html"   },
      // Governance artefacts published from public/privacy/*.md and referenced by
      // the Privacy Policy at extensionless URLs (RETENTION.md is linked with its
      // extension, so it resolves directly from the static file).
      { source: "/privacy/DPIA",           destination: "/privacy/DPIA.md" },
      { source: "/privacy/RoPA",           destination: "/privacy/RoPA.md" },
      { source: "/privacy/BREACH_RUNBOOK", destination: "/privacy/BREACH_RUNBOOK.md" },
      { source: "/privacy/SUBPROCESSORS",  destination: "/privacy/SUBPROCESSORS.md" },
    ];
  },
};

export default nextConfig;
