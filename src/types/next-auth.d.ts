import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tokenData: string;
  }

  interface Session {
    user: User;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    token?: string;
  }
}
