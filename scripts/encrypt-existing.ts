/**
 * One-shot migration: encrypt any remaining plaintext passwords in
 * InstaAccount.password and Proxy.password. Safe to run multiple times —
 * already-encrypted values are detected by the `enc:v1:` prefix and skipped.
 *
 * Usage:  npx tsx scripts/encrypt-existing.ts
 */
import { prisma } from "../src/lib/prisma";
import { encrypt, isEncrypted } from "../src/lib/crypto";

async function main() {
  let accountUpdated = 0;
  let proxyUpdated = 0;

  const accounts = await prisma.instaAccount.findMany({
    select: { id: true, password: true },
  });
  for (const a of accounts) {
    if (!a.password || isEncrypted(a.password)) continue;
    await prisma.instaAccount.update({
      where: { id: a.id },
      data: { password: encrypt(a.password) },
    });
    accountUpdated++;
  }

  const proxies = await prisma.proxy.findMany({
    select: { id: true, password: true },
  });
  for (const p of proxies) {
    if (!p.password || isEncrypted(p.password)) continue;
    await prisma.proxy.update({
      where: { id: p.id },
      data: { password: encrypt(p.password) },
    });
    proxyUpdated++;
  }

  console.log(`Encrypted ${accountUpdated} instaAccount + ${proxyUpdated} proxy rows.`);
}

main().finally(() => prisma.$disconnect());
