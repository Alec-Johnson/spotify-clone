import { atom } from "recoil";

export const followingState = atom<SpotifyApi.ArtistObjectFull[] | null>({
	key: "followingState",
	default: null,
});

export const reccomendationsState = atom<any | null>({
	key: "reccomendationsState",
	default: null,
});

export const recentlyPlayedState = atom<SpotifyApi.PlayHistoryObject[] | null>({
	key: "recentlyPlayedState",
	default: null,
});
