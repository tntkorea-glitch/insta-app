import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized } from "@/lib/api-utils";
import { NextRequest } from "next/server";

// GET /api/schedule
export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  let config = await prisma.scheduleConfig.findUnique({
    where: { userId: user.id },
  });

  if (!config) {
    const defaultSchedule = {
      mon: Array(24).fill(0),
      tue: Array(24).fill(0),
      wed: Array(24).fill(0),
      thu: Array(24).fill(0),
      fri: Array(24).fill(0),
      sat: Array(24).fill(0),
      sun: Array(24).fill(0),
    };
    config = await prisma.scheduleConfig.create({
      data: {
        userId: user.id,
        schedule: JSON.stringify(defaultSchedule),
      },
    });
  }

  return Response.json({
    ...config,
    schedule: JSON.parse(config.schedule),
    tasks: JSON.parse(config.tasks),
  });
}

// PUT /api/schedule
export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const body = await request.json();
  const data: Record<string, string> = {};

  if (body.schedule) data.schedule = JSON.stringify(body.schedule);
  if (body.tasks) data.tasks = JSON.stringify(body.tasks);

  const config = await prisma.scheduleConfig.upsert({
    where: { userId: user.id },
    update: data,
    create: {
      userId: user.id,
      schedule: data.schedule || JSON.stringify({}),
      tasks: data.tasks || "[]",
    },
  });

  return Response.json({
    ...config,
    schedule: JSON.parse(config.schedule),
    tasks: JSON.parse(config.tasks),
  });
}
