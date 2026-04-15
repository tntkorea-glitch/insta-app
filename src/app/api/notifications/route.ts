import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized, badRequest } from "@/lib/api-utils";
import { notifyUser } from "@/lib/notifications";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const pref = await prisma.notificationPreference.findUnique({
    where: { userId: user.id },
  });

  if (!pref) {
    const created = await prisma.notificationPreference.create({
      data: { userId: user.id },
    });
    return Response.json(created);
  }
  return Response.json(pref);
}

const prefSchema = z.object({
  emailEnabled: z.boolean().optional(),
  notifyOnError: z.boolean().optional(),
  notifyOnSuccess: z.boolean().optional(),
  notifyDailyReport: z.boolean().optional(),
});

export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const body = await request.json();
  const parsed = prefSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const pref = await prisma.notificationPreference.upsert({
    where: { userId: user.id },
    update: parsed.data,
    create: { userId: user.id, ...parsed.data },
  });

  return Response.json(pref);
}

// POST /api/notifications/test - 테스트 이메일 전송
export async function POST() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const result = await notifyUser(
    user.id,
    "success",
    "테스트 알림",
    "Liketica 알림 시스템이 정상 동작합니다."
  );

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json({ success: true });
}
