import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from '../store/artists'
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'


const Playlists = () => {
  const dispatch = useDispatch()

  const ArtistItem = styled.a`
  display:flex;
  flex-direction:column;
  background-color: #272727;
  border-radius: 25px;
  color:white;
  padding:10px;
  align-items:center;
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
        <CategoryFont> All Playlists</CategoryFont>
        <div></div>
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
export default Playlists
