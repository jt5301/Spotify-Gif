import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getPlaylists } from '../store/playlists'
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'


const Playlists = () => {
  const dispatch = useDispatch()

  const PlaylistItem = styled.a`
  display:flex;
  flex-direction:column;
  background-color: #272727;
  color:white;
  padding:10px;
  align-items:center;
  border-radius: 25px;
  transition: 0.3s;
  &:hover{
    background-color: #1DB954;
  }
  `

  const ArtistPortrait = styled.img`
  width:150px;
  height:150px;
  `

  const playlists = useSelector(state => state.playlists.allPlaylists)
  useEffect(() => {
    dispatch(getPlaylists())
  }, [])
  console.log(playlists)
  return (
    <main>
      <header className='categoryHeader'>
        <CategoryFont> All Playlists</CategoryFont>
        <div></div>
      </header>
      <div>
        <div className='topArtists'>
          {playlists ? playlists.map((current) => {
            return (
              <PlaylistItem key={current.id} href={`/playlist/${current.id}`}>
                <ArtistPortrait src={current.images[0].url} />
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px',

                }}>
                  {current.name}
                </div>
                <div style={{
                  color: '#B3B3B3',
                  fontSize: '12px',
                }}>{current.tracks.total} songs</div>
              </PlaylistItem>

            )
          }) : ''}
        </div>
      </div>
    </main>
  )
}
export default Playlists
