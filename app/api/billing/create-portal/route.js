import { auth } from "@/auth";
import User from "@/models/User";
import connectMongo from "@/utils/mongoose";
import { getCustomer, lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  await connectMongo();
  const user = await User.findById(session.user.id);

  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY,
  });

  const customer = await getCustomer(user.customerId);
  return NextResponse.json({
    url: customer.data.data.attributes.urls.customer_portal,
  });
}
