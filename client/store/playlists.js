import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PLAYLISTS = 'GOT_PLAYLISTS'
const GOT_SINGLE_PLAYLIST = 'GOT_SINGLE_PLAYLIST'

/**
 * INITIAL STATE
 */
const allPlaylists = {}

/**
 * ACTION CREATORS
 */
const gotPlaylists = playlists => ({ type: GOT_PLAYLISTS, playlists })

const gotSinglePlaylist = singlePlaylist => ({ type: GOT_SINGLE_PLAYLIST, singlePlaylist })

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

export const getSinglePlaylist = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/playlist/${id}`)

    dispatch(gotSinglePlaylist(res.data))
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
    default:
      return state
  }
}
