/**
 * Verify that every Template entry in lib/templates.ts matches the actual
 * bundle file on disk.
 *
 * Catches the exact failure mode from 2026-05-18 — curator pasted the
 * wrong sha256 (the bundle's internal manifest.integrity_sha256 instead
 * of the file-bytes sha256), making the install button fail with a
 * "sha256 mismatch" 400 from NarraNexus's /api/bundle/import/from-url.
 *
 * Hooked into `npm run build` via the `prebuild` script — a broken
 * registry now fails CI / Vercel build, not the user's install click.
 *
 * Usage:
 *   npm run verify:templates          # run standalone
 *   npm run build                     # runs verify:templates first via prebuild
 */

import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

import { TEMPLATES } from "../lib/templates";

const PROJECT_ROOT = dirname(dirname(__filename));

interface Failure {
  slug: string;
  reasons: string[];
}

async function main() {
  const failures: Failure[] = [];

  for (const t of TEMPLATES) {
    const reasons: string[] = [];

    // Phase 2+ object-storage URLs are absolute; skip on-disk check (a future
    // verify can HEAD the URL and compare Content-Length / hash from a manifest).
    if (!t.bundle_url.startsWith("/")) {
      console.log(`SKIP ${t.slug}: bundle_url is absolute (off-disk: ${t.bundle_url})`);
      continue;
    }

    const filePath = join(PROJECT_ROOT, "public", t.bundle_url);

    try {
      const st = await stat(filePath);
      const buf = await readFile(filePath);
      const actualSha = createHash("sha256").update(buf).digest("hex");

      if (st.size !== t.bundle_size_bytes) {
        reasons.push(
          `bundle_size_bytes mismatch: declared=${t.bundle_size_bytes} actual=${st.size}`,
        );
      }
      if (actualSha.toLowerCase() !== t.bundle_sha256.toLowerCase()) {
        reasons.push(
          `bundle_sha256 mismatch:\n      declared=${t.bundle_sha256}\n      actual  =${actualSha}\n      (fix: shasum -a 256 ${filePath})`,
        );
      }
    } catch (e) {
      reasons.push(`could not read ${filePath}: ${(e as Error).message}`);
    }

    if (reasons.length === 0) {
      console.log(`OK   ${t.slug}`);
    } else {
      failures.push({ slug: t.slug, reasons });
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} template(s) failed verification:\n`);
    for (const f of failures) {
      console.error(`  ${f.slug}:`);
      for (const r of f.reasons) console.error(`    - ${r}`);
    }
    process.exit(1);
  }

  console.log(`\nAll ${TEMPLATES.length} template(s) verified.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
