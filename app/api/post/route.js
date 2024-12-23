// an API endpoint to create a new Post document in the database. The route is not protected by the auth middleware, so anyone can create a new post. The route expects a POST request with a title, description in the request body. THe boardId is in the query parameters. THe userId field is populated with the user's id if they are loggedin

import { NextResponse } from "next/server";
import connectMongo from "@/utils/mongoose";
import { Filter } from "bad-words";
import { auth } from "@/auth";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description } = body;

    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    const badWordsFilter = new Filter();
    const sanitizedTitle = badWordsFilter.clean(title);
    const sanitizedDescription = badWordsFilter.clean(description);

    if (!sanitizedTitle) {
      return NextResponse.json(
        { error: "Post Title is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    await connectMongo();

    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
