import { GetServerSideProps } from 'next';
import { getProviders, signIn} from 'next-auth/react'
import Image from 'next/image';
import styles from '../styles/Login.module.scss'

type SpotifyProviderProps = {
  providers: {
    spotify: {
      callBackUrl: string,
      id: string,
      name: string,
      signInUrl: string, 
      type: string,
    }
  }
}

function Login({ providers }: SpotifyProviderProps) {
  console.log(providers);
  
  return (
    <div className={styles.container}>
      <Image src='/spotify-logo.png' width={300} height={300} alt='Spotify logo' />
      {/* Object.values() returns an array of the values of the object, .entries() returns an array of the key-value pairs of the object */}
      {Object.values(providers).map((spotify) => ( 
        <div key={spotify.name}>
          <button className={styles.loginBtn} onClick={() => signIn(spotify.id, { callbackUrl: "/"})}>Login with {spotify.name}</button>
        </div>
      ))} 
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  };
}

export default Login;