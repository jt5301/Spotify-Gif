import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSingleArtist } from '../store/artists'

const ArtistProfile = (props) => {
  const artistId = props.match.params.id

  const dispatch = useDispatch()

  const artist = useSelector(state => state.artists.singleArtist)
  useEffect(() => {
    dispatch(getSingleArtist(artistId))
  }, [])
  return (<div>HELLOLOLOLOLOOLO</div>)
  // const dispatch = useDispatch()

  // const artistProfile = useSelector(state => state.artists.SingleArtist)

  // useEffect(() => {
  //   dispatch(getSingleArtist(props.artist))
  // })
}

export default ArtistProfile
