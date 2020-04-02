import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSingleTrack } from '../store/tracks'

const TrackProfile = (props) => {
  const trackId = props.match.params.id

  const dispatch = useDispatch()

  const track = useSelector(state => state.tracks)

  useEffect(() => {
    dispatch(getSingleTrack(trackId))
  }, [])
  console.log('what is this', track)
  return (<div>HELLO</div>)
  // const dispatch = useDispatch()

  // const artistProfile = useSelector(state => state.artists.SingleArtist)

  // useEffect(() => {
  //   dispatch(getSingleArtist(props.artist))
  // })
}

export default TrackProfile
