import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized } from "@/lib/api-utils";

// GET /api/analytics
export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const accounts = await prisma.instaAccount.findMany({
    where: { userId: user.id },
    select: { id: true, username: true, followers: true, following: true },
  });

  // 최근 30일 분석 데이터
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const analyticsData = await prisma.analyticsDaily.findMany({
    where: {
      instaAccountId: { in: accounts.map((a) => a.id) },
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: "asc" },
  });

  // 최근 활동 로그
  const recentLogs = await prisma.activityLog.findMany({
    where: {
      instaAccountId: { in: accounts.map((a) => a.id) },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      instaAccount: { select: { username: true } },
    },
  });

  return Response.json({
    accounts,
    analytics: analyticsData,
    recentLogs,
  });
}
