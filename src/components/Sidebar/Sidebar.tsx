import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon
} from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'

import styles from './Sidebar.module.scss'

function Sidebar() {
  
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
        <p className={styles.playlistName}>Playlist Name...</p>
      </div>
    </div>
  )
}

export default Sidebar
