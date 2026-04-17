import { NextRequest } from "next/server";
import net from "net";
import { prisma } from "@/lib/prisma";
import { getAuthUser, unauthorized, badRequest } from "@/lib/api-utils";

async function tcpConnect(host: string, port: number, timeoutMs = 5000): Promise<{ ok: true; latencyMs: number } | { ok: false; error: string }> {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    let settled = false;
    const finish = (result: { ok: true; latencyMs: number } | { ok: false; error: string }) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish({ ok: true, latencyMs: Date.now() - start }));
    socket.once("timeout", () => finish({ ok: false, error: `연결 시간 초과 (${timeoutMs}ms)` }));
    socket.once("error", (e) => finish({ ok: false, error: e.message }));
    try {
      socket.connect(port, host);
    } catch (e) {
      finish({ ok: false, error: e instanceof Error ? e.message : "connect error" });
    }
  });
}

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const { id } = await ctx.params;
  if (!id) return badRequest("id가 필요합니다");

  const proxy = await prisma.proxy.findFirst({
    where: { id, userId: user.id },
    select: { host: true, port: true, protocol: true },
  });
  if (!proxy) return badRequest("프록시를 찾을 수 없습니다");

  const result = await tcpConnect(proxy.host, proxy.port);
  if (result.ok) {
    return Response.json({
      success: true,
      latencyMs: result.latencyMs,
      message: `${proxy.host}:${proxy.port} 연결 성공 (${result.latencyMs}ms)`,
    });
  }
  return Response.json(
    {
      success: false,
      error: result.error,
      message: `${proxy.host}:${proxy.port} 연결 실패 — ${result.error}`,
    },
    { status: 200 }
  );
}
