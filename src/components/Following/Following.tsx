import { useRecoilValue } from "recoil";
import { followingState } from "@atoms/feedAtom";

import styles from './Following.module.scss'

function Following() {
  const following = useRecoilValue(followingState);
  console.log(following);
  

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Following</h2>
        </div>
        {following && following.map((artist) => {
          return (
            <div key={artist.id} className={styles.artist}>
              <img src={artist.images[2].url} alt={artist.name} />
              <p className={styles.artistName}>{artist.name}</p>
              <p className={styles.artistType}>{artist.type}</p>
            </div>
          )
        })}
      </div>
  )
}

export default Following
