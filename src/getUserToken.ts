// 'use server'
// import { cookies } from "next/headers";
// import { decode } from "next-auth/jwt"

// export async function getUserToken() {
//   const cookieData = await cookies();
//   const encryptedToken = cookieData.get("next-auth.session-token")?.value 
//   const data = await decode({token: encryptedToken, secret: process.env.NEXTAUTH_SECRET!})
//   return data?.token
// }


'use server'
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const cookieData = await cookies();
  const encryptedToken =
    cookieData.get("next-auth.session-token")?.value ||
    cookieData.get("__Secure-next-auth.session-token")?.value;

  if (!encryptedToken) return null;

  const data = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! });
  return data?.token;
}
