import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bycrptjs from "bcryptjs";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

import { getUser } from "@lib/actions";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(
        credentials: Record<never, string> | undefined,
        req: any
      ) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await getUser(email);
          if (!user) {
            return null;
          }
          const passwordsMatch = await bycrptjs.compare(
            password,
            user.password
          );
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.error("Error fetching user:", error);
          throw new Error("Failed to fetch user.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          const ifUserExists = await getUser(email);
          if (ifUserExists) {
            return user;
          }

          const id = uuidv4();

          try {
            await sql`
                  INSERT INTO users (id, name, email, password)
                  VALUES (${id}, ${name}, ${email}, ${""})
                `;
          } catch (error) {
            return "Database Error: Failed to Create Account.";
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
    async jwt({ token, user }: { user: any; token: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      console.log("token: ", token);
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      console.log("session: ", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
