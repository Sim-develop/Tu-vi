import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export default async function middleware(req: NextRequest) {
  // Check if route is protected
  const protectedRoutes = ["/user"];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    // Check for valid session
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie ?? "");

    // Redirect unauthed users
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }
  }
  // Render route
  return NextResponse.next();
}
