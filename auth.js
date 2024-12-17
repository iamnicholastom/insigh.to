import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./utils/mongo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  adapter: MongoDBAdapter(clientPromise),
});
