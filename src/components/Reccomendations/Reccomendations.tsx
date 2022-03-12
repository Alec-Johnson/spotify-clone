import { useRecoilValue } from 'recoil';
import { reccomendationsState } from '@atoms/feedAtom';
import styles from './Reccomendations.module.scss'

function Reccomendations() {
  const reccomended = useRecoilValue(reccomendationsState);
 
  return (
    <div className={styles.container}>
      <h2>For You</h2>
      {reccomended && reccomended.tracks.map((track: SpotifyApi.TrackObjectFull) => (
        <div key={track.id} className={styles.track}>
          <img src={track.album.images[1].url} alt={track.album.name} />
          <div className={styles.artistWrapper}>
            <div className={styles.trackName}>{track.name}</div>
            <div className={styles.trackArtist}>{track.artists[0].name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Reccomendations
