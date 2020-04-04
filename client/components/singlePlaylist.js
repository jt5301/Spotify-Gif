import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSinglePlaylist } from '../store/playlists'
import { Bar } from 'react-chartjs-2'

const SinglePlaylist = (props) => {

  const playlistId = props.match.params.id

  const dispatch = useDispatch()

  const playlist = useSelector(state => state.playlists.singlePlaylist)

  console.log(playlist)
  useEffect(() => {
    dispatch(getSinglePlaylist(playlistId))
  }, [])
  const chartData = {
    labels: ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence']
  }

  return (
    <div>
      {playlist ?
        <Bar
          data={playlist.info}
          width={100}
          height={50}
          options={{ maintainAspectRatio: false }}
        />
        : ''}

    </div>

  )
  // const dispatch = useDispatch()

  // const artistProfile = useSelector(state => state.artists.SingleArtist)

  // useEffect(() => {
  //   dispatch(getSingleArtist(props.artist))
  // })
}

export default SinglePlaylist
