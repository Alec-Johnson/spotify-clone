import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// Create another instance of SpotifyWebApi to use locally for the API calls
const spotifyApi= new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
	const { data, status } = useSession();
	useEffect(() => {
		if (data) {
			// Push to login if refresh access token attempt error
			if ((data.error = "RefreshAccessTokenError")) {
				signIn();
			}

			spotifyApi.setAccessToken(data?.user?.accessToken);
		}
	}, [data]);

	return spotifyApi;
}

export default useSpotify;
