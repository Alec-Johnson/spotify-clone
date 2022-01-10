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
import { useRecoilState } from 'recoil'
import { playlistIDState } from '../../atoms/playlistAtom'
import { currentViewState } from '../../atoms/viewAtom'
import useSpotify from '../../hooks/useSpotify'

import styles from './Sidebar.module.scss'

function Sidebar() {
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[] | null>([])
  // Set selected playlistId globally so that it can be used in other components
  const [playlistId, setPlaylistId] = useRecoilState(playlistIDState)
  const [view, setView] = useRecoilState(currentViewState)

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
        <button onClick={() => setView('home')}>
          <HomeIcon />
          <p>Home</p>
        </button>
        <button onClick={() => setView('search')}>
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
            setView('playlist')}} 
            className={styles.playlistName} key={playlist.id}>
            {playlist.name}
          </p>
        ))}
        
      </div>
    </div>
  )
}

export default Sidebar
