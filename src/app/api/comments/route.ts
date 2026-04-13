import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized, badRequest } from "@/lib/api-utils";
import { NextRequest } from "next/server";
import { z } from "zod";

// GET /api/comments
export async function GET() {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const groups = await prisma.commentGroup.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(
    groups.map((g) => ({
      ...g,
      comments: JSON.parse(g.comments),
    }))
  );
}

const commentGroupSchema = z.object({
  name: z.string().min(1),
  comments: z.array(z.string()),
});

// POST /api/comments
export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const body = await request.json();
  const parsed = commentGroupSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const group = await prisma.commentGroup.create({
    data: {
      userId: user.id,
      name: parsed.data.name,
      comments: JSON.stringify(parsed.data.comments),
    },
  });

  return Response.json({ ...group, comments: JSON.parse(group.comments) }, { status: 201 });
}

// DELETE /api/comments?id=xxx
export async function DELETE(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return badRequest("댓글 그룹 ID가 필요합니다");

  await prisma.commentGroup.deleteMany({ where: { id, userId: user.id } });
  return Response.json({ success: true });
}

// PUT /api/comments
export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const body = await request.json();
  const { id, ...data } = body;
  if (!id) return badRequest("댓글 그룹 ID가 필요합니다");

  if (data.comments && Array.isArray(data.comments)) {
    data.comments = JSON.stringify(data.comments);
  }

  await prisma.commentGroup.updateMany({
    where: { id, userId: user.id },
    data,
  });

  return Response.json({ success: true });
}
