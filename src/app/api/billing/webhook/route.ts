import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// POST /api/billing/webhook — Stripe webhook handler
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return new Response("Missing signature", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (userId && plan) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan,
            stripeSubscriptionId: session.subscription as string,
          },
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;

      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: customerId },
      });

      if (user) {
        const isActive = ["active", "trialing"].includes(subscription.status);
        if (!isActive) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: "FREE", stripeSubscriptionId: null },
          });
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;

      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { plan: "FREE", stripeSubscriptionId: null },
      });
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
