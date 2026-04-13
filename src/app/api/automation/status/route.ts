import { getAuthUser, unauthorized } from "@/lib/api-utils";
import { getAccountStatus } from "@/lib/automation-engine";
import { prisma } from "@/lib/prisma";

// GET /api/automation/status — get all accounts' automation status
export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const accounts = await prisma.instaAccount.findMany({
    where: { userId: user.id },
    select: { id: true, username: true, status: true, lastActivity: true },
  });

  const statuses = accounts.map((acc) => {
    const engineStatus = getAccountStatus(acc.id);
    return {
      accountId: acc.id,
      username: acc.username,
      dbStatus: acc.status,
      running: engineStatus.running,
      stats: engineStatus.stats,
      lastActivity: acc.lastActivity,
    };
  });

  return Response.json(statuses);
}
