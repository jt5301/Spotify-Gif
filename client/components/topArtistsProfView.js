import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from '../store/artists'


const TopArtistsProfView = () => {
  const dispatch = useDispatch()

  const artists = useSelector(state => state.artists.TopArtists)
  useEffect(() => {
    dispatch(getArtists(10, 'long_term'))
  }, [])
  let limit = 0


  return (
    <div>
      Top Artists of All Time
      <div className='artistList'>
        {artists ? artists.items.map((current) => {
          return (
            <div key={current.id}>
              <img src={current.images[1].url} />
              {current.name}
            </div>

          )
        }) : ''}
      </div>
    </div>
  )
}

export default TopArtistsProfView
