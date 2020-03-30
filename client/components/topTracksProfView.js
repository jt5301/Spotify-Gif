import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../store/tracks'
import styled from 'styled-components'


const TopTracksProfView = () => {
  const dispatch = useDispatch()

  const tracks = useSelector(state => state.tracks.topTracks)
  useEffect(() => {
    dispatch(getTracks(10, 'long_term'))
  }, [])

  const Header = styled.div`
    display: flex;
    flex-direction:row;
    justify-content:space-between;
  `
  const SingleTrack = styled.a`
  flex-direction: row;
  display: grid;
  justify-content: space-between;
  align-items:center;
  grid-template-columns: 100px 500px 20px;
  grid-template-columns: 100px 500px 20px;
  margin: 10px 10px 10px 10px
  `
  return (
    <div style={{ width: '25%' }}>
      <Header>
        <h3>Top Tracks of All Time</h3>
        <h3>See More</h3>
      </Header>

      <div>
        {tracks ? tracks.items.map((current) => {
          return (
            <SingleTrack key={current.id}>
              <img className='profilePhotos' src={current.album.images[1].url} />
              <div>
                {current.name}
                <div>
                  {current.album.name} - {current.artists[0].name}
                </div>
              </div>
              {millisToMinutesAndSeconds(current.duration_ms)}
            </SingleTrack>

          )
        }) : ''}
      </div>
    </div>
  )
}
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
export default TopTracksProfView
