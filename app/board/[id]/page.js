import connectMongo from "@/utils/mongoose";
import Board from "@/models/Board";
import { redirect } from "next/navigation";
import FormAddPost from "@/components/FormAddPost";

async function getBoard(boardId) {
  await connectMongo();

  const board = await Board.findById(boardId);

  if (!board) {
    redirect("/");
  }

  return board;
}

const PublicFeedbackBoard = async ({ params }) => {
  const { id } = await params;
  const board = await getBoard(id);
  return (
    <main className="min-h-screen bg-base-200">
      {board.name} (public)
      <FormAddPost id={id} />
    </main>
  );
};

export default PublicFeedbackBoard;
