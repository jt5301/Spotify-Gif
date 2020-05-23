import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import { getSingleTrack } from '../store/tracks'
import { HeaderFont } from '../../public/styling/fonts'

const TrackProfile = (props) => {
  const trackId = props.match.params.id

  const dispatch = useDispatch()

  const track = useSelector(state => state.tracks)

  useEffect(() => {
    dispatch(getSingleTrack(trackId))
  }, [])

  return (
    <main>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div className='profile' >
          <img className='profilePortrait'
            src={track.singleTrack ? track.singleTrack.album.images[1].url : ''} />
        </div>

        <div className='profile' >
          <HeaderFont>{track.singleTrack ? track.singleTrack.name : ''}</HeaderFont>
        </div>
        <h3 style={{
          color: 'grey',
          marginTop: '0',
          display: 'flex',
          justifyContent: 'center',
        }}>{track.singleTrack ? track.singleTrack.album.name : ''} - {track.singleTrack ? track.singleTrack.artists[0].name : ''}</h3>
      </div>
    </main >
  )
  // const dispatch = useDispatch()

  // const artistProfile = useSelector(state => state.artists.SingleArtist)

  // useEffect(() => {
  //   dispatch(getSingleArtist(props.artist))
  // })
}

export default TrackProfile
