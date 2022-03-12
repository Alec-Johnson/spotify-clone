import Following from "@components/Following/Following";
import Reccomendations from "@components/Reccomendations/Reccomendations";
import RecentlyPlayed from "@components/RecentlyPlayed/RecentlyPlayed";

import { useEffect} from "react";
import { useRecoilState} from "recoil";
import { followingState, reccomendationsState, recentlyPlayedState } from "@atoms/feedAtom";
import useSpotify from "@hooks/useSpotify";

import styles from '@styles/pages/Feed.module.scss'
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

function Feed() {
  const [following, setFollowing] = useRecoilState(followingState);
  const [reccomendations, setReccomendations] = useRecoilState(reccomendationsState);
  const [recentlyPlayed, setRecentlyPlayed] = useRecoilState(recentlyPlayedState);

  const spotifyApi = useSpotify()

  useEffect(() => {
    const fetchFeed = () => {
      if (spotifyApi.getAccessToken()) {
        spotifyApi.getFollowedArtists({ limit: 20})
          .then((data) => {
            setFollowing(data.body.artists.items)
        });
        spotifyApi.getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 })
          .then((data) => {
            setReccomendations(data.body)
        });
        spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 })
          .then((data) => {
            setRecentlyPlayed(data.body.items)
        });
      }  
    }
    fetchFeed()
  }, [])
  
  return (
    <div className={styles.container}>
      <Following />
      <Reccomendations />
      <RecentlyPlayed />
    </div>
  )
}

export default Feed

export const getServerSideProps: GetServerSideProps = async(context) => {
  const session = await getSession(context)
  return {
    props: {
      session
    },
  }
}