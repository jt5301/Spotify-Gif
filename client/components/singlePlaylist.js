import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSinglePlaylist } from '../store/playlists'

const SinglePlaylist = (props) => {
  const playlistId = props.match.params.id

  const dispatch = useDispatch()

  const playlist = useSelector(state => state.playlists.singlePlaylist)

  useEffect(() => {
    dispatch(getSinglePlaylist(playlistId))
  }, [])
  console.log('what is this', playlist)
  return (<div>HELLOLOLOLOLOOLO</div>)
  // const dispatch = useDispatch()

  // const artistProfile = useSelector(state => state.artists.SingleArtist)

  // useEffect(() => {
  //   dispatch(getSingleArtist(props.artist))
  // })
}

export default SinglePlaylist
