'use server'
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const TokenSession = {process.env.Node_ENV === "production"? '__Secure-next-auth.session-token':'next-auth.session-token'}
  const cookieData = await cookies();
  const encryptedToken =
    cookieData.get(TokenSession)?.value;

  if (!encryptedToken) return null;

  const data = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! });
  return data?.token;
}
