import SpotifyWebApi from "spotify-web-api-node";
import { URLSearchParams } from "url";

// Auth Scopes: https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
  // Spotfy Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  // Users
  "user-read-private",
  "user-read-email",
  // Follow
  "user-follow-read",
  // Library
  "user-library-read",
  // "user-library-modify", not recommended, access token could leak and allow editing to your library
  // Playlist
  "playlist-read-private",
  "playlist-read-collaborative",
  // Playback
  "streaming",
  // Listening History
  "user-read-recently-played",
  "user-top-read",
].join(',');

const params = {
  scopes: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

// https://github.com/thelinmichael/spotify-web-api-node
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi;