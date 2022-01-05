import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

const refreshAccessToken = async (token) => {
	try {
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshToken);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
		console.log("Refreshed access token:", refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1 hour
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Replace with new refresh token, else use old one
		}
	} catch (error) {
		console.log('Error:', error);
		return {
			...token,
			error: "refreshAccessToken error:"
		};
	}
}

// NextAuth has built in support with their own spotify provider 
// More info here: https://next-auth.js.org/providers/spotify
export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
		// ...add more providers here
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, user }) {
			// First sign in
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000, // convert to ms, 3600 * 1000
				};
			}

			// Return previous token if the access token is not expired
			if (Date.now() < token.accessTokenExpires) {
				console.log("Existing Access Token is valid");
				return token;
			}

			// Refresh the access token, if it is expired
			console.log("Existing Access Token is expired, refreshing now...");
			return await refreshAccessToken(token)
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;
			return session;
		}
	},
});
