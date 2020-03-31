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
  display: grid;
  align-items:center;
  grid-template-columns: 100px 260px auto;
  margin: 10px 10px 10px 10px;
  transition: 0.3s;
  background-color: #272727;
  &:hover{
    background-color: #1DB954;
  }
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
              <div >
                {current.name}
                <div style={{
                  color: '#B3B3B3',
                  fontSize: '12px',
                }}>
                  {current.album.name} - {current.artists[0].name}
                </div>
              </div>
              <div style={{
                color: '#B3B3B3',
                fontSize: '12px'
              }}>{millisToMinutesAndSeconds(current.duration_ms)}</div>
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
