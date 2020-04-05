import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PLAYLISTS = 'GOT_PLAYLISTS'
const GOT_SINGLE_PLAYLIST = 'GOT_SINGLE_PLAYLIST'
const RECOMMENDED_SONGS = 'RECOMMENDED_SONGS'

/**
 * INITIAL STATE
 */
const allPlaylists = {}

/**
 * ACTION CREATORS
 */
const gotPlaylists = playlists => ({ type: GOT_PLAYLISTS, playlists })

const gotSinglePlaylist = singlePlaylist => ({ type: GOT_SINGLE_PLAYLIST, singlePlaylist })

const recommendedPlaylist = newPlaylist => ({
  type: RECOMMENDED_SONGS,
  newPlaylist
})

/**
 * THUNK CREATORS
 */
export const getPlaylists = () => async dispatch => {
  try {
    const res = await axios.get('/api/spotify/playlists')

    dispatch(gotPlaylists(res.data.items || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const recSongs = (songs) => async dispatch => {
  try {
    let seedTracks = []
    songs.forEach((current) => {
      seedTracks.push(current.track.id)
    })

    if (seedTracks.length > 5) seedTracks.splice(5, seedTracks.length - 5)

    let recdSongs = await axios.post('/api/spotify/recommendedTracks', seedTracks)
    dispatch(recommendedPlaylist(recdSongs.data.tracks))
  } catch (error) {
    console.log(error)
  }
}

export const getSinglePlaylist = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/playlist/${id}`)
    let playlist = res.data
    let songIds = []
    playlist.tracks.items.forEach((current) => {
      songIds.push(current.track.id)
    })
    const playlistInfo = await axios.post('/api/spotify/playlistDetail', songIds)


    let danceability = 0, energy = 0, acousticness = 0, instrumentalness = 0, liveness = 0, speechiness = 0, valence = 0

    playlistInfo.data.audio_features.forEach((current) => {
      danceability += current.danceability
      energy += current.energy
      acousticness += current.acousticness
      instrumentalness += current.instrumentalness
      liveness += current.liveness
      speechiness += current.speechiness
      valence += current.valence
    })
    playlist.info = [acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence]
    dispatch(gotSinglePlaylist(playlist))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function (state = allPlaylists, action) {
  switch (action.type) {
    case GOT_PLAYLISTS:
      return { ...state, allPlaylists: action.playlists }
    case GOT_SINGLE_PLAYLIST:
      return { ...state, singlePlaylist: action.singlePlaylist }
    case RECOMMENDED_SONGS:
      console.log('in store', action.newPlaylist)
      return { ...state, newPlaylist: action.newPlaylist }
    default:
      return state
  }
}
