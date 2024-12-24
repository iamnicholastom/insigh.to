import connectMongo from "@/utils/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import FormAddPost from "@/components/FormAddPost";
import CardPost from "@/components/CardPost";

async function getData(boardId) {
  await connectMongo();

  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ createdAt: -1 });

  if (!board) {
    redirect("/");
  }

  return {
    board,
    posts,
  };
}

const PublicFeedbackBoard = async ({ params }) => {
  const { id } = await params;
  const { board, posts } = await getData(id);
  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board.name}</h1>
      </section>
      <section className="max-w-5xl mx-auto px-5 flex flex-col items-start md:flex-row gap-8 pb-12">
        <FormAddPost id={id} />
        <ul className="space-y-4 flex-grow">
          {posts.map((post) => (
            <CardPost key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default PublicFeedbackBoard;
