import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "@atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
	const spotifyApi = useSpotify();
	const [currentIdTrack, setCurrentIdTrack] =
		useRecoilState(currentTrackIdState);
	const [songInfo, setSongInfo] = useState<any | null>(null);

	// Async is not supported in useEffect by default, so we need to define the function, then call it within useEffect
	useEffect(() => {
		const fetchSongInfo = async () => {
			if (currentIdTrack) {
				const track = await spotifyApi.getTrack(currentIdTrack);
				setSongInfo(track);
			}
		};
		fetchSongInfo();
	});

	return songInfo;
}

export default useSongInfo;
