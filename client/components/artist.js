import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from '../store/artists'
import styled from 'styled-components'


const Artists = () => {
  const dispatch = useDispatch()

  const ArtistItem = styled.a`
  display:flex;
  flex-direction:column;
  background-color: grey;
  border-radius: 25px;
  `
  const ArtistPortrait = styled.img`
  border-radius:50%;
  width:200px;
  height:200px;
  `

  const ArtistLink = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
  `

  const artists = useSelector(state => state.artists.TopArtists)
  useEffect(() => {
    dispatch(getArtists(50, 'long_term'))
  }, [])
  return (
    <main>
      <header className='artistHeader'>
        <h3>Top Artists</h3>
        <div className='timebar'>
          <button onClick={() => dispatch(getArtists(50, 'long_term'))}>All Time</button>
          <button onClick={() => dispatch(getArtists(50, 'medium_term'))}>Last Six Months</button>
          <button onClick={() => dispatch(getArtists(50, 'short_term'))}>Last Four Weeks</button>
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



    </main >
  )
}

export default Artists
