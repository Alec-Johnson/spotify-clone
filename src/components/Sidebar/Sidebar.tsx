import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIDState } from '@atoms/playlistAtom'
import useSpotify from '@hooks/useSpotify'

import styles from './Sidebar.module.scss'
import Link from 'next/link'

function Sidebar() {
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[] | null>([])
  // Set selected playlistId globally so that it can be used in other components
  const [playlistId, setPlaylistId] = useRecoilState(playlistIDState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((playlists) => {
        setPlaylists(playlists.body.items)
      })
    }
  }, [spotifyApi])
  
  return (
    <div className={styles.container}>
      <div className={styles.btnGroup}>
        <Link href='/feed' passHref>
          <button>
            <HomeIcon />
            <p>Home</p>
          </button>
        </Link>
        <button>
          <SearchIcon />
          <p>Search</p>
        </button>
        <button>
          <LibraryIcon />
          <p>Your Library</p>
        </button>
        <hr />

        <button>
          <PlusCircleIcon />
          <p>Create Playlist</p>
        </button>
        <button>
          <HeartIcon />
          <p>Liked Songs</p>
        </button>
        
        <hr />

        {/* User playlists... */}
        {playlists && playlists.map((playlist: SpotifyApi.PlaylistBaseObject) => (
          <p onClick={() => {
            setPlaylistId(playlist.id)
          }}
          className={styles.playlistName} key={playlist.id}>
            <Link href='/'>
              {playlist.name}
            </Link> 
          </p>
        ))}
        
      </div>
    </div>
  )
}

export default Sidebar
