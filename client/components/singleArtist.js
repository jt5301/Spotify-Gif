import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HeaderFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSingleArtist } from '../store/artists'

const ArtistProfile = (props) => {
  const artistId = props.match.params.id

  const dispatch = useDispatch()

  const artist = useSelector(state => state.artists.singleArtist)
  useEffect(() => {
    dispatch(getSingleArtist(artistId))
  }, [])

  console.log(artist)
  return (
    <main>
      <div>
        <div className='profile' >
          <img className='profilePortrait'
            src={artist ? artist.images[0].url : ''} />
        </div>

        <div className='profile' >
          <HeaderFont>{artist ? artist.name : ''}</HeaderFont>
        </div>
      </div>

      <div className='profileRow'>
        <div className='artistCategories'>Genres:
        <ul style={{

            textTransform: 'capitalize',
            paddingLeft: 0
          }}>
            {artist ? artist.genres.map((current) => {

              return (<p className='artistCategories' key={current}>{current}</p>)
            }) : ''}
          </ul>
        </div>
        <p>Similar Artists</p>
        <p>Top Songs</p>
      </div>

      {/* <div className='profileRow' >
        <ul style={{
          listStyleType: 'none',
          textTransform: 'capitalize'
        }}>
          {artist ? artist.genres.map((current) => {

            return (<li key={current}>{current}</li>)
          }) : ''}
        </ul>
        <ul>Similar Artists</ul>
        <ul>Top Songs</ul>
      </div> */}


    </main >)
  // const dispatch = useDispatch()

  // const artistProfile = useSelector(state => state.artists.SingleArtist)

  // useEffect(() => {
  //   dispatch(getSingleArtist(props.artist))
  // })
}

export default ArtistProfile
