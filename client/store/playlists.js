import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PLAYLISTS = 'GET_PLAYLISTS'

/**
 * INITIAL STATE
 */
const playlists = {}

/**
 * ACTION CREATORS
 */
const gotPlaylists = playlists => ({ type: GOT_PLAYLISTS, playlists })

/**
 * THUNK CREATORS
 */
export const getPlaylists = () => async dispatch => {
  try {
    const res = await axios.get('/api/spotify/playlists')
    dispatch(gotPlaylists(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = playlists, action) {
  switch (action.type) {
    case GOT_PLAYLISTS:
      return { ...state, state: action.playlists }
    default:
      return state
  }
}
