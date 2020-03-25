import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../store/tracks'
import styled from 'styled-components'

const Tracks = () => {
  const dispatch = useDispatch()

  const SingleTrack = styled.a`
    flex-direction: row;
    display: grid;
    justify-content: space-between;
    align-items:center;
    grid-template-columns: 100px 500px 250px 40px;
    margin: 10px 10px 10px 10px
  `


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
        <div className='trackList'>
          <SingleTrack>
            <div>Album Art</div>
            <div>Song Name</div>
            <div>Artist</div>
            <div>Duration</div>
          </SingleTrack>
          {tracks ? tracks.items.map((current) => {
            return (
              <SingleTrack trackMap key={current.id}>

                <img className='profilePhotos' src={current.album.images[1].url} />
                <div>{current.name}</div>
                <div>{current.artists[0].name}</div>
                <div>{millisToMinutesAndSeconds(current.duration_ms)}</div>
              </SingleTrack>

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
