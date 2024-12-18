import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboardlayout = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return children;
};

export default Dashboardlayout;
