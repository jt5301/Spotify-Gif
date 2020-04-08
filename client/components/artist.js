import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from '../store/artists'
import { CategoryFont, TimeButtons } from '../../public/styling/fonts'
import styled from 'styled-components'


const Artists = () => {
  const dispatch = useDispatch()

  const ArtistItem = styled.a`
  display:flex;
  flex-direction:column;
  background-color: #272727;
  border-radius: 25px;
  color:white;
  padding:10px;
  align-items:center;
  transition: 0.3s;
  &:hover{
    background-color: #1DB954;
  }
  `

  const ArtistPortrait = styled.img`
  border-radius:50%;
  width:150px;
  height:150px;
  `

  const artists = useSelector(state => state.artists.TopArtists)
  useEffect(() => {
    dispatch(getArtists(50, 'long_term'))
  }, [])
  return (
    <main>
      <header className='categoryHeader'>
        <CategoryFont>Top Artists</CategoryFont>
        <div className='timebar'>
          <TimeButtons onClick={() => dispatch(getArtists(50, 'long_term'))}>All Time</TimeButtons>
          <TimeButtons onClick={() => dispatch(getArtists(50, 'medium_term'))}>Last Six Months</TimeButtons>
          <TimeButtons onClick={() => dispatch(getArtists(50, 'short_term'))}>Last Four Weeks</TimeButtons>
        </div>
      </header>
      <div>
        <div className='topArtists'>
          {artists ? artists.items.map((current) => {
            return (
              <ArtistItem key={current.id} href={`/artist/${current.id}`}>
                <ArtistPortrait src={current.images[1].url} />
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px',

                }}>{current.name}</div>
              </ArtistItem>

            )
          }) : ''}
        </div>
      </div>
    </main>
  )
}

export default Artists
