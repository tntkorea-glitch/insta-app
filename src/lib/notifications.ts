import { prisma } from "./prisma";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

type SendResult = { ok: true } | { ok: false; error: string };

async function sendViaResend(opts: EmailOptions): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "noreply@liketica.com";
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown resend error" };
  }
}

async function sendViaSmtp(opts: EmailOptions): Promise<SendResult> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return { ok: false, error: "SMTP env vars not set" };
  }

  try {
    // nodemailer is an optional peer dep — type it as unknown so TS doesn't require its types
    const mod = (await import("nodemailer" as string).catch(() => null)) as
      | { default: { createTransport: (opts: unknown) => { sendMail: (opts: unknown) => Promise<unknown> } } }
      | null;
    if (!mod) return { ok: false, error: "nodemailer not installed" };
    const transporter = mod.default.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT ?? 587) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || SMTP_USER,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "unknown smtp error" };
  }
}

async function sendEmail(opts: EmailOptions): Promise<SendResult> {
  if (process.env.RESEND_API_KEY) return sendViaResend(opts);
  if (process.env.SMTP_HOST) return sendViaSmtp(opts);
  return { ok: false, error: "no email provider configured" };
}

async function logNotification(
  userId: string,
  type: string,
  subject: string,
  message: string,
  email: string,
  result: SendResult
) {
  await prisma.notificationLog.create({
    data: {
      userId,
      type,
      subject,
      message,
      email,
      status: result.ok ? "sent" : "failed",
    },
  });
}

export async function notifyUser(
  userId: string,
  type: "error" | "success" | "daily",
  subject: string,
  message: string
): Promise<SendResult> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });
  if (!user?.email) return { ok: false, error: "user has no email" };

  const pref = await prisma.notificationPreference.findUnique({
    where: { userId },
  });

  if (pref) {
    if (!pref.emailEnabled) return { ok: false, error: "email disabled" };
    if (type === "error" && !pref.notifyOnError) return { ok: false, error: "error notifications off" };
    if (type === "success" && !pref.notifyOnSuccess) return { ok: false, error: "success notifications off" };
    if (type === "daily" && !pref.notifyDailyReport) return { ok: false, error: "daily report off" };
  }

  const text = message;
  const html = `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:12px">
    <h2 style="color:#a78bfa;margin:0 0 16px">${subject}</h2>
    <p style="white-space:pre-wrap;line-height:1.6">${message.replace(/</g, "&lt;")}</p>
    <hr style="border:none;border-top:1px solid #334155;margin:24px 0" />
    <p style="font-size:12px;color:#64748b">Liketica — Instagram 자동화</p>
  </div>`;

  const result = await sendEmail({ to: user.email, subject: `[Liketica] ${subject}`, text, html });
  await logNotification(userId, type, subject, message, user.email, result);
  return result;
}

export async function notifyError(userId: string, accountUsername: string, error: string) {
  return notifyUser(
    userId,
    "error",
    `자동화 오류: @${accountUsername}`,
    `계정 @${accountUsername}에서 자동화 실행 중 오류가 발생했습니다.\n\n${error}`
  );
}
