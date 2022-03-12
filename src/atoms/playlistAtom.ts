import { atom } from "recoil";

export const playlistState = atom<SpotifyApi.PlaylistObjectFull | null>({
	key: "playlistState",
	default: null,
});

export const playlistIDState = atom({
	key: "playlistIDState",
	default: "37i9dQZF1DX5trt9i14X7j",
});
