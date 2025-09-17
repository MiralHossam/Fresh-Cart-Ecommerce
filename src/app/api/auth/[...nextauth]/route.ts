import NextAuth, { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();

        if (data.message === "success") {
          const decodedToken: { id: string } = jwtDecode(data.token);

          return {
            id: decodedToken.id,
            _id: decodedToken.id,
            name: data.user?.name || null,
            email: data.user?.email || null,
            image: data.user?.image || null,
            tokenData: data.token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user.tokenData;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
