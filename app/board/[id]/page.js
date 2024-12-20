import connectMongo from "@/utils/mongoose";
import Board from "@/models/Board";
import { redirect } from "next/navigation";

async function getBoard(boardId) {
  await connectMongo();

  const board = await Board.findById(boardId);

  if (!board) {
    redirect("/");
  }

  return board;
}

const PublicFeedbackBoard = async ({ params }) => {
  const { id } = params;
  const board = await getBoard(id);
  return <div>{board.name} (public)</div>;
};

export default PublicFeedbackBoard;
