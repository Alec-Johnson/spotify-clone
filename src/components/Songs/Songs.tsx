import Song from "@components/Song/Song"
import { useRecoilValue } from "recoil"
import { playlistState } from "@atoms/playlistAtom"
import styles from './Songs.module.scss'

function Songs() {
  // Already have the playlist
  const playlist = useRecoilValue(playlistState)

  return (
    <div className={styles.container}>
      {playlist?.tracks.items.map((track: any, i: any) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs
