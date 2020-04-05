import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryFont } from '../../public/styling/fonts'
import styled from 'styled-components'
import { getSinglePlaylist } from '../store/playlists'
import { HorizontalBar } from 'react-chartjs-2'
import { NavLink } from 'react-router-dom'

const SinglePlaylist = (props) => {

  const playlistId = props.match.params.id

  const dispatch = useDispatch()

  const playlist = useSelector(state => state.playlists.singlePlaylist)

  const playlistInfo = playlist ? playlist.info : []
  const playlistSongs = playlist ? playlist.tracks.items : []
  // const recommendSongs = (songs) => dispatch(recSongs(songs))



  useEffect(() => {
    dispatch(getSinglePlaylist(playlistId))
  }, [])


  const chartData = {
    labels: ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'],
    datasets: [{
      data: playlistInfo,
      label: 'Audio Data',
      backgroundColor: [
        'rgba(34, 56, 67, .7)',
        'rgb(239, 241, 243, .7)',
        'rgba(248, 112, 96, 0.7)',
        'rgba(147, 125, 100, 0.7)',
        'rgba(71, 98, 79, 0.7)',
        'rgba(50, 103, 113, 0.7)',
        'rgba(190, 176, 167, 0.7)',
      ],
    }]
  }
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
    <>
      {playlist ?
        <main>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div className='playlistProfile'>
              <img className='profileProtrait'
                src={playlist.images[1] ? playlist.images[1].url : playlist.images[0].url}
              />
              <h1>{playlist.name}</h1>
              <h4 style={{
                color: 'grey',
                marginTop: '0',
              }}>{playlist.owner.display_name} - {playlist.tracks.items.length} tracks </h4>
            </div>

            <div className='chartContainer'>
              <HorizontalBar
                data={chartData}
                style="position: relative; height:20vh; width:20vw"
                options={{
                  // maintainAspectRatio: false,
                  scales: {
                    yAxes: [{
                      stacked: true,
                      gridLines: {
                        display: true,
                        color: "rgba(94, 100, 114)"
                      }
                    }],
                    xAxes: [{
                      gridLines: {
                        display: true,
                        color: "rgba(94, 100, 114)"
                      }
                    }]
                  }
                }}
              />
              <NavLink to={{
                pathname: '/recommendedSongs',
                songs: { playlistSongs }
              }}>Get a Recommended Playlist</NavLink>
            </div>
          </div>

          <div style={{
            width: '-webkit-fill-available',
          }}>
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
            {playlist.tracks.items.map((current) => {
              return (
                <SingleTrack
                  href={`/track/${current.track.id}`} key={current.track.id}>
                  <img className='profilePhotos' src={current.track.album.images[1].url} />
                  <div>{current.track.name}</div>
                  <div>{current.track.artists[0].name}</div>
                  <div>{millisToMinutesAndSeconds(current.track.duration_ms)}</div>
                </SingleTrack>
              )
            })}
          </div>

        </main>

        : ''}
    </>
  )

}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


export default SinglePlaylist
