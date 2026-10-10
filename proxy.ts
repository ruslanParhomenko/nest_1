import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/schedule", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!$|api|_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
