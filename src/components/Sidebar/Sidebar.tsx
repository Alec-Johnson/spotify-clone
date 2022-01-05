import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'

import styles from './Sidebar.module.scss'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data, status } = useSession()
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[] | null>([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((playlists) => {
        setPlaylists(playlists.body.items)
      })
    }
  }, [data, spotifyApi])
  
  return (
    <div className={styles.container}>
      <div className={styles.btnGroup}>
      <button onClick={() => signOut()}>
          <HomeIcon />
          <p>Logout</p>
        </button>
        <button>
          <HomeIcon />
          <p>Home</p>
        </button>
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

        {/* Playlists... */}
        {playlists?.map((playlist) => (
          <p className={styles.playlistName} key={playlist.id}>{playlist.name}</p>
        ))}
        
      </div>
    </div>
  )
}

export default Sidebar
