import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const { searchParams } = request.nextUrl;

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const tab = searchParams.get("tab") ?? "bar";
    const month = searchParams.get("month") ?? currentMonth.toString();
    const year = searchParams.get("year") ?? currentYear.toString();

    const url = request.nextUrl.clone();

    url.pathname = "/schedule";
    url.searchParams.set("tab", tab);
    url.searchParams.set("month", month);
    url.searchParams.set("year", year);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!$|api|_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
