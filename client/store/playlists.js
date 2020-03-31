import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PLAYLISTS = 'GOT_PLAYLISTS'

/**
 * INITIAL STATE
 */
const allPlaylists = {}

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

    dispatch(gotPlaylists(res.data.items || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = allPlaylists, action) {
  switch (action.type) {
    case GOT_PLAYLISTS:
      return { ...state, allPlaylists: action.playlists }
    default:
      return state
  }
}
