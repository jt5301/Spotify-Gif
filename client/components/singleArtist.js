import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HeaderFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSingleArtist, getRecommendedSongs, getRecommendedArtists } from '../store/artists'

const ArtistProfile = (props) => {
  const artistId = props.match.params.id

  const dispatch = useDispatch()

  const artist = useSelector(state => state.artists.singleArtist)
  const recommendedSongs = useSelector(state => state.artists.recdSongs)
  const recommendedArtists = useSelector(state => state.artists.recdArtists)


  useEffect(() => {
    dispatch(getSingleArtist(artistId))
    dispatch(getRecommendedArtists(artistId))
    dispatch(getRecommendedSongs(artistId))
  }, [])

  const SingleItem = styled.a`
  color:white;
  &:hover{
      text-decoration: underline;
      }`


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

              return (<p key={current}>{current}</p>)
            }) : ''}
          </ul>
        </div>

        <div className='artistCategories'>Similar Artists in the U.S:
        <ul style={{
            textTransform: 'capitalize',
            paddingLeft: 0
          }}>
            {recommendedArtists ? recommendedArtists.map((current) => {

              return (<p><SingleItem href={`/artist/${current.id}`} key={current.id}>{current.name}</SingleItem></p>)
            }) : ''}
          </ul>
        </div>

        <div className='artistCategories'>Top Songs:
        <ul style={{
            textTransform: 'capitalize',
            paddingLeft: 0,
            // width:'150px'
          }}>
            {recommendedSongs ? recommendedSongs.map((current) => {
              return (<p><SingleItem href={`/track/${current.id}`} key={current.id}>{current.name}</SingleItem></p>)
            }) : ''}
          </ul>
        </div>
      </div>
    </main >)
}

export default ArtistProfile
