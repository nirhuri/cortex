import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Debug logging
  console.log(`🔍 Middleware - Path: ${pathname}, Has Token: ${!!token}`);

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  console.log(`🔍 Is Public Path: ${isPublicPath}`);

  // אם היוזר לא מחובר ומנסה לגשת לעמוד מוגן – נעביר אותו ללוגין
  if (!token && !isPublicPath) {
    console.log(`➡️ Redirecting to login (no token + protected path)`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // אם היוזר מחובר ומנסה לגשת ללוגין או סיינאפ – נעביר אותו לדשבורד
  if (token && isPublicPath) {
    console.log(`➡️ Redirecting to dashboard (has token + public path)`);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log(`✅ Allowing request to proceed`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
