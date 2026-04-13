import { auth } from "./auth";
import { prisma } from "./prisma";

export async function getAuthUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
  });
}

export function unauthorized() {
  return Response.json({ error: "인증이 필요합니다" }, { status: 401 });
}

export function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}
