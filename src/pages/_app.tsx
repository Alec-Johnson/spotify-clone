import Sidebar from '@components/Sidebar/Sidebar'
import '@styles/index.scss'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import styles from '@styles/pages/App.module.scss'
import Player from '@components/Player/Player'

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <div className={styles.wrapper}>
          <Sidebar />
          <Component {...pageProps} />
          <div className={styles.playerWrapper}>
            <Player />
          </div>
        </div>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
