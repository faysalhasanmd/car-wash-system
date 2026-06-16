import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  pages: {
    signIn: "/login", // ✅ custom login page
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        console.log(credentials, "credentials");

        const userCollection = await dbConnect("users");
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) return null;

        return user;
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
    async signIn({ user }) {
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
      return true;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
