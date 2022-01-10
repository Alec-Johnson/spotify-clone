import Following from "@components/Following/Following";
import Reccomendations from "@components/Reccomendations/Reccomendations";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { followingState, reccomendationsState } from "src/atoms/feedAtom";
import useSpotify from "src/hooks/useSpotify";

import styles from './Feed.module.scss'

function Feed() {
  const [following, setFollowing] = useRecoilState(followingState);
  const [reccomendations, setReccomendations] = useRecoilState(reccomendationsState);
  const spotifyApi = useSpotify()

  useEffect(() => {
    const fetchFeed = () => {
      if (spotifyApi.getAccessToken() && !reccomendations) {
        spotifyApi.getFollowedArtists({ limit: 20})
          .then((data) => {
            setFollowing(data.body.artists.items)
        });
        spotifyApi.getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 })
          .then((data) => {
            setReccomendations(data.body)
        });
      }  
    }
    fetchFeed()
  }, [])
  
  return (
    <div className={styles.container}>
      <Following />
      <Reccomendations />
      
    </div>
  )
}

export default Feed
