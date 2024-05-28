import NextAuth from "next-auth";
import { config } from "@app/config/auth";

const handler = NextAuth(config);
export { handler as GET, handler as POST };
