import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../store/tracks'

const Tracks = () => {
  const dispatch = useDispatch()

  const tracks = useSelector(state => state.tracks.topTracks)
  useEffect(() => {
    dispatch(getTracks(50, 'long_term'))
  }, [])
  console.log('in component', tracks)
  return (
    <main>


      <header className='artistHeader'>
        <h3>Top Tracks</h3>
        <div className='timebar'>
          <button onClick={() => dispatch(getTracks(50, 'long_term'))}>All Time</button>
          <button onClick={() => dispatch(getTracks(50, 'medium_term'))}>Last Six Months</button>
          <button onClick={() => dispatch(getTracks(50, 'short_term'))}>Last Four Weeks</button>
        </div>
      </header>
      <div>
        Top Tracks
      <div className='trackList'>
          {tracks ? tracks.items.map((current) => {
            return (
              <div key={current.id}>
                <img className='profilePhotos' src={current.album.images[1].url} />
                {current.name}
                {millisToMinutesAndSeconds(current.duration_ms)}
              </div>

            )
          }) : ''}
        </div>
      </div>



    </main>
  )
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default Tracks
