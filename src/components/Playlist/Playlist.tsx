/* eslint-disable @next/next/no-img-element */
// Playlist images will have different domain urls which won't work with
// next/image due having to whitelist each new domain.
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useEffect} from 'react'

import styles from './Playlist.module.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIDState, playlistState } from '../../atoms/playlistAtom'
import useSpotify from '../../hooks/useSpotify'
import Songs from '@components/Songs/Songs'

function Playlist() {
  const { data } = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIDState)
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(()=> {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(playlistId).then(playlist => {
        setPlaylist(playlist.body)
      }).catch(err => console.log('err:', err));
    }
  }, [spotifyApi, playlistId])

  console.log(playlist);
  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {data &&
        <div onClick={() => signOut()}>
          <img src={data?.user?.image || '../../placeholder-profile.png'} alt='My Spotify profile image' className={styles.profileImg} />
          <h2>{data?.user?.name}</h2>
          <ChevronDownIcon />
        </div>
        }
      </header>
      {playlist &&
        <section>
          <img src={playlist.images[0].url} alt={`${playlist.name} playlist image.`}/>
          <div className={styles.playlistTextContainer}>
            <p>PLAYLIST</p>
            <h2 className={styles.playlistName}>{playlist.name}</h2>
          </div>
        </section>
      }
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Playlist
