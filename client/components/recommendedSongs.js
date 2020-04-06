import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { recSongs, addPlaylist } from '../store/playlists'


const RecommendedSongs = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(recSongs(props.location.songs.playlistSongs))
  }, [])

  const tracks = useSelector(state => state.playlists.newPlaylist)
  const playlistName = props.location.playlistName
  const userId = props.location.userId
  const addSongs = (userId, playlistName, tracks) => dispatch(addPlaylist(userId, playlistName, tracks))
  console.log(props)
  const SingleTrack = styled.a`
  display: grid;
  justify-content: space-evenly;
  align-items:center;
  color:white;
  grid-template-columns: 75px 200px 100px 10px;
  margin: 10px 10px 10px 10px;
  &:hover{
    text-decoration: underline;
    }`

  return (
    <main>
      <div>
        <header className='categoryHeader'>
          <CategoryFont>Recommended Tracks</CategoryFont>
          <div className='timebar'>
            <button onClick={() => addSongs(userId, playlistName, tracks)}>Add To Playlist</button>
          </div>
        </header>
        <div className='trackList'>

          <div style={{
            display: 'grid',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gridTemplateColumns: '75px 200px 100px 10px',
            margin: '10px 10px 10px 10px'
          }}>
            <div>Album Art</div>
            <div>Song Name</div>
            <div>Artist</div>
            <div>Duration</div>
          </div>
          {tracks ? tracks.map((current) => {
            return (
              <SingleTrack href={`/track/${current.id}`} key={current.id}>

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

export default RecommendedSongs
