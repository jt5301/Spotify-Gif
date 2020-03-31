import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from '../store/artists'
import styled from 'styled-components'

const TopArtistsProfView = () => {
  const dispatch = useDispatch()

  const artists = useSelector(state => state.artists.TopArtists)
  useEffect(() => {
    dispatch(getArtists(10, 'long_term'))
  }, [])

  const Header = styled.div`
    display: flex;
    flex-direction:row;
    justify-content:space-between;
  `
  const SingleArtist = styled.a`
  display: grid;
  justify-content: space-between;
  background-color: #272727;
  transition: 0.3s;
  &:hover{
    background-color: #1DB954;
  }
  align-items:center;
  grid-template-columns: 100px 300px;
  margin: 10px 10px 10px 10px
`

  return (
    <div style={{ width: '25%' }}>
      <Header>
        <h3>Top Artists of All Time</h3>
        <h3>See More</h3>
      </Header>
      <div className='artistList'>
        {artists ? artists.items.map((current) => {
          return (
            <SingleArtist key={current.id}>
              <img className='profilePhotos' src={current.images[1].url} />
              {current.name}
            </SingleArtist>

          )
        }) : ''}
      </div>
    </div>
  )
}

export default TopArtistsProfView
