"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function getUserToken(): Promise<string | null> {
  const cookieStore = await cookies(); 

  const req = {
    cookies: Object.fromEntries(
      (await cookieStore.getAll()).map(c => [c.name, c.value])
    ),
  } as unknown as NextRequest;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !("tokenData" in token)) return null;

  return token.tokenData as string;
}
