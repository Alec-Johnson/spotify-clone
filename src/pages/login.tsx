import { GetServerSideProps } from 'next';
import { getProviders, signIn} from 'next-auth/react'
import Image from 'next/image';
import styles from '../styles/Login.module.scss'

type SpotifyProviderProps = {}

function Login({ providers }: SpotifyProviderProps) {
  console.log(providers);
  
  return (
    <div className={styles.container}>
      <Image src='/spotify-logo.png' width={300} height={300} alt='Spotify logo' />
      
    </div>
  )
}

export default Login;