import { useRecoilValue } from "recoil";
import { followingState } from "src/atoms/feedAtom";

import styles from './Following.module.scss'

function Following() {
  const following = useRecoilValue(followingState);

  return (
      <div className={styles.container}>
        <h2>Following</h2>
        {following && following.map((artist) => {
          return (
            <div key={artist.id} className={styles.artist}>
              <img src={artist.images[2].url} alt={artist.name} />
              <div className={styles.artistName}>{artist.name}</div>
            </div>
          )
        })}
      </div>
  )
}

export default Following
