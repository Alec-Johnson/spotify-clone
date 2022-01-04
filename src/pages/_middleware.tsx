import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// More info about this file: https://nextjs.org/docs/middleware
export async function middleware(req: NextRequest & NextApiRequest) {
	// Token will exist on the session if the user is logged in
	const token = await getToken({ req, secret: process.env.JWT_SECRET! });

	const { pathname } = req.nextUrl;

	// Allow requests from the server if following are true:
	// - its a request for next-auth session
	// - token exists

	if (pathname.includes("/api/auth") || token) {
		return NextResponse.next(); // Allow the request, continue
	}

	// If they have a token and try to login, redirect them to the home page
	if (token && pathname === '/login'){
		return NextResponse.redirect('/');
	}

	// Redirect to the login page if there is no token and the route requested has protection
	if (!token && pathname !== "/login") {
		return NextResponse.redirect("/login");
	}
}
