import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../store/tracks'


const TopTracksProfView = () => {
  const dispatch = useDispatch()

  const tracks = useSelector(state => state.tracks.topTracks)
  useEffect(() => {
    dispatch(getTracks(10, 'long_term'))
  }, [])
  console.log(tracks)

  return (
    <div>
      Top Tracks of All Time
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
  )
}
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
export default TopTracksProfView
