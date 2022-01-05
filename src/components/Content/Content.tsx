import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'

import styles from './Content.module.scss'
import Songs from '@components/Songs/Songs'
import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIDState, playlistState } from 'src/atoms/playlistAtom'
import useSpotify from 'src/hooks/useSpotify'

const colors = [
  'blue',
  'green',
  'red',
  'purple',
  'yellow',
  'orange'
];

function Content() {
  const { data } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState<string | undefined>('blue')
  const playlistId = useRecoilValue(playlistIDState)
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

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
        <div>
          <Image width={40} height={40} src={data?.user?.image || '/spotify-logo.png'} alt='My Spotify profile image' className={styles.profileImg} />
          <h2>{data?.user?.name}</h2>
          <ChevronDownIcon />
        </div>
      </header>

      <section className={color}>
        <img src={playlist?.images?.[0]?.url} alt={`${playlist?.name} playlist image.`}/>
        <div className={styles.playlistTextContainer}>
          <p>PLAYLIST</p>
          <h2 className={styles.playlistName}>{playlist?.name}</h2>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Content
