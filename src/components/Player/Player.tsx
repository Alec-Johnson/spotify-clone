/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, FastForwardIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useRecoilState } from 'recoil'

import { currentTrackIdState, isPlayingState } from '@atoms/songAtom'
import useSongInfo from '@hooks/useSongInfo'
import useSpotify from '@hooks/useSpotify'

import styles from './Player.module.scss'

function Player() {
  const { data } = useSession()
  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const [volume, setVolume] = useState(50)

  const fetchCurrentTrack = () => {
    if (!songInfo) {
      // Get the current track, set the current track id to our currentTrackIdState atom
      spotifyApi.getMyCurrentPlayingTrack().then((res) => {
        setCurrentTrackId(res.body?.item?.id)

        // Get current playback state -> set to isPlaying in our isPlayingState atom
        spotifyApi.getMyCurrentPlaybackState().then((res) => {
          setIsPlaying(res.body?.is_playing)
        })
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      if (res.body?.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  // Get current track on component mount
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // Fetch current song info
      fetchCurrentTrack()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, data])
  
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      adjustVolumeDebounced(volume)
    }
  }, [volume])

  // useCallback to prevent re-creation of function on every render (volume change, in above useEffect), 
  // Created on mount due to empty dependency array
  // Wait 500ms between setting volume, to prevent spamming the API
  const adjustVolumeDebounced = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume)
    }, 500), [])

  return (
    <div className={styles.container}>
      {/* Left side */}
      <div className={styles.left}>
        <img className={styles.playingImg} src={songInfo?.body?.album?.images?.[0]?.url} alt='' />
        <div>
            <h3>{songInfo?.body?.name}</h3>
            <p>{songInfo?.body?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className={styles.center}>
        <div className={styles.controls}>
          <SwitchHorizontalIcon className={styles.button} />
          <RewindIcon
          // Not working currently, getting error code 429 (Too Many Requests) despite never reaching limit 
          // onClick={() => spotifyApi.skipToPrevious()} 
            className={styles.button} 
          />
          {isPlaying ? 
            <PauseIcon onClick={handlePlayPause} className={`${styles.button} ${styles.playPause}`} /> 
              : 
            <PlayIcon onClick={handlePlayPause} className={`${styles.button} ${styles.playPause}`} />
          }
          <FastForwardIcon
            // Not working currently, getting error code 429 (Too Many Requests) despite never reaching limit 
            // onClick={() => spotifyApi.skipToNext()}
            className={styles.button} 
          />
          <ReplyIcon className={styles.button} />
        </div>
      </div>
      {/* Right side */}
      <div className={styles.right}>
        <VolumeDownIcon className={styles.volume}
          onClick={() => (volume > 0) && setVolume(volume - 10)}
        />
          <input type='range' min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value)) } />
        <VolumeUpIcon 
          onClick={() => (volume < 100) && setVolume(volume + 10)}
          className={styles.volume}
        />
      </div>
    </div>
  )
}

export default Player