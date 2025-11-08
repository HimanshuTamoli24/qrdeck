import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    console.log("token",token)
    return NextResponse.next(); 
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
    pages: {
      signIn: "/auth", 
    },
  }
);

// Match protected routes
export const config = {
  matcher: ["/", "/dashboard/:path*"], 
};
