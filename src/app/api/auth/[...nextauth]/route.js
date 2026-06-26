// app/api/auth/[...nextauth]/route.js
import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCollection = await dbConnect("users");
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) return null;

        // Return safe user object (no password)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? user.photoURL ?? null,
          role: user.role ?? "user",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Only create DB record for OAuth providers
      if (account?.provider !== "credentials") {
        const users = await dbConnect("users");
        const isUserExist = await users.findOne({ email: user.email });
        if (!isUserExist) {
          await users.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          });
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      // After sign-in, go to dashboard
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role ?? "user";
      }
      return session;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }

      // Re-fetch role on every session access (keeps role fresh if admin changes it)
      if (trigger === "update" && session) {
        token.name = session.name ?? token.name;
        token.picture = session.image ?? token.picture;
      }

      // Always sync role from DB so changes take effect without re-login
      if (token.email && !user) {
        try {
          const users = await dbConnect("users");
          const dbUser = await users.findOne({ email: token.email });
          if (dbUser?.role) token.role = dbUser.role;
        } catch {
          // DB failure — keep existing role
        }
      }

      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
