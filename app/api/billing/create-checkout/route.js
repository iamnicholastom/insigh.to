import { auth } from "@/auth";
import User from "@/models/User";
import connectMongo from "@/utils/mongoose";
const { NextResponse } = require("next/server");
import {
  lemonSqueezySetup,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.successUrl) {
      return NextResponse.json(
        { error: "Success URL is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    await connectMongo();

    const user = await User.findById(session.user.id);

    lemonSqueezySetup({
      apiKey: process.env.LEMONSQUEEZY_API_KEY,
    });

    const checkoutLemonSqueezy = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID,
      process.env.LEMONSQUEEZY_VARIANT_ID,
      {
        productOptions: {
          redirectUrl: body.successUrl,
        },
        checkoutData: {
          email: user.email,
          custom: {
            userId: user._id.toString(),
          },
        },
      }
    );

    return NextResponse.json({
      url: checkoutLemonSqueezy.data.data.attributes.url,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
