import { getAuthUser, unauthorized, badRequest } from "@/lib/api-utils";
import { stripe, PLANS, PlanKey } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// POST /api/billing/checkout — create Stripe checkout session
export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return unauthorized();

  const { plan } = await request.json();
  if (!plan || !(plan in PLANS)) return badRequest("유효하지 않은 플랜입니다");

  const planKey = plan as PlanKey;
  const planData = PLANS[planKey];
  if (!("priceId" in planData) || !planData.priceId) {
    return badRequest("무료 플랜은 결제가 필요하지 않습니다");
  }

  // Get or create Stripe customer
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) return unauthorized();

  let customerId = dbUser.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: dbUser.email,
      name: dbUser.name || undefined,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const baseUrl = request.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: planData.priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard/billing?success=true`,
    cancel_url: `${baseUrl}/dashboard/billing?canceled=true`,
    metadata: { userId: user.id, plan: planKey },
  });

  return Response.json({ url: session.url });
}
