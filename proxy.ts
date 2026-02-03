import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "./lib/cookies";

const publicRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];
const consumerRoutes = ["/consumer"];
const farmerRoutes = ["/farmer"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getAuthToken();
  const user = token ? await getUserData() : null;

  

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isConsumerRoute = consumerRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isFarmerRoute = farmerRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && user) {
    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isConsumerRoute && user.role !== "admin" && user.role !== "consumer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isFarmerRoute && user.role !== "admin" && user.role !== "farmer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isPublicRoute && token) {
    const role = user?.role;

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (role === "consumer") {
      return NextResponse.redirect(new URL("/consumer", request.url));
    }

    if (role === "farmer") {
      return NextResponse.redirect(new URL("/farmer", request.url));
    }

    // fallback
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/consumer/:path*",
    "/farmer/:path*",
    "/login",
    "/register",
  ],
};
