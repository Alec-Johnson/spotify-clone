import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import styles from './Content.module.scss'

function Content() {
  const { data } = useSession()
  return (
    <div className={styles.container}>
      <header>
        <div>
          <img src={data?.user.image || '/spotify-logo.png'} alt='My Spotify profile image' className={styles.profileImg} />
          <h2>{data?.user.name}</h2>
          <ChevronDownIcon />
        </div>
      </header>
    </div>
  )
}

export default Content
