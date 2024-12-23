import { auth } from "@/auth";
import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import User from "@/models/User";
import Board from "@/models/Board";
import connectMongo from "@/utils/mongoose";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonPortal from "@/components/ButtonPortal";

async function getUser() {
  const session = await auth();

  await connectMongo();

  return await User.findById(session.user.id).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();
  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100">
        <div className="px-5 py-3 flex justify-between max-w-5xl mx-auto">
          {user.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </div>
      </section>
      <section className="px-5 py-12 max-w-5xl mx-auto space-y-12">
        <FormNewBoard />
        <div>
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length}Boards
          </h1>
          <ul className="space-y-4">
            {user.boards.map((board) => (
              <li key={board._id}>
                <Link
                  href={`/dashboard/board/${board._id}`}
                  className="block bg-base-100 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200"
                >
                  {board.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
