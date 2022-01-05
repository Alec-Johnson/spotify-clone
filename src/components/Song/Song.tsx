import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "src/atoms/songAtom"
import useSpotify from "src/hooks/useSpotify"
import { msToMinutesAndSeconds } from "src/lib/time"
import styles from './Song.module.scss'

type SongProps = {
  track: any,
  order: number,
} 

function Song({ track, order }: SongProps) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  
  
  const playSong = () => {
    setCurrentTrackId(track?.track?.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [track?.track?.uri],
    });
  };

  return (
    <div className={styles.container} onClick={playSong}>
      <div className={styles.songInfo}>
        <p>{order + 1}</p>
        <img src={track?.track?.album?.images[0]?.url} alt={track.track.name} className={styles.trackImg} />
        <div>
          <p className={styles.trackName}>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className={styles.albumInfo}>
        <p className={styles.albumName}>{track.track.album.name}</p>
        <p>{msToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
