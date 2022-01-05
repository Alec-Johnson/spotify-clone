import { atom } from "recoil";

export const playlistState = atom<SpotifyApi.PlaylistBaseObject | null>({
	key: "playlistState",
	default: null,
});

export const playlistIDState = atom({
	key: "playlistIDState",
	default: "1vpWWvMmkJWULDnDLEeMYZ",
});
