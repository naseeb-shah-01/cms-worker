// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  console.log("🛑 Middleware hit:", req.nextUrl.pathname);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  

  const pathname = req.nextUrl.pathname;

  if (!token) {
    console.log("❌ No token → redirect login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    console.log("🚫 Not admin");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/worker") && token.role !== "WORKER") {
    console.log("🚫 Not worker");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("✅ Access granted");
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/worker/:path*",
    "/profile/:path*",
  ],
};
