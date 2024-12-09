import "server-only";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET);

const cookieVar = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 26 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookieVar.duration);
  const session = await encrypt({ userId, expires });

  cookies().set(cookieVar.name, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expires,
  });
  redirect("/");
}

export async function verifySession() {
  const cookie = cookies().get(cookieVar.name)?.value;
  const session = await decrypt(cookie ?? "");
  if (!session?.userId) {
    redirect("/signin");
  }

  return { userId: session?.userId };
}

export async function deleteSession() {
  cookies().delete(cookieVar.name);
  redirect("/signin");
}