import { atom } from "recoil";

// Current track ID selected
export const currentTrackIdState = atom<any | SpotifyApi.TrackObjectFull>({
	key: "currentTrackIdState",
	default: null,
});

export const isPlayingState = atom({
	key: "isPlayingState",
	default: false,
});
