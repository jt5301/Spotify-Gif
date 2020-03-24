import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from '../store/artists'

const Artists = () => {
  const dispatch = useDispatch()

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
              <div key={current.id}>
                <img className='profilePhotos' src={current.images[1].url} />
                {current.name}
              </div>

            )
          }) : ''}
        </div>
      </div>



    </main>
  )
}

export default Artists
