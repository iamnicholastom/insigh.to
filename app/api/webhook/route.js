import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import connectMongo from "@/utils/mongoose";
import User from "@/models/User";

export async function POST(request) {
  try {
    // verify if webhook is coming from LemonSqueezy
    const body = await request.text();

    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMONSQUEEZY_SIGNING_SECRET
    );
    const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
    const signature = Buffer.from(headers().get("x-signature"), "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta.event_name;

    if (eventName === "order-created") {
      // Grant access to the product

      await connectMongo();

      const user = await User.findById(payload.meta.custom_data.user_id);

      user.hasAccess = true;
      user.customerId = payload.data.attributes.customer_id;

      await user.save();
    } else if (
      eventName === "subscription_expired" ||
      eventName === "subscription_payment_failed"
    ) {
      // Revoke access
      await connectMongo();

      const user = await User.findById(payload.meta.custom_data.user_id);

      user.hasAccess = false;
      await user.save();
    }
  } catch (e) {
    console.error("LemonSqueezy Error: ", e?.message);
  }

  return NextResponse.json({});
}
