import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PLAYLISTS = 'GET_PLAYLISTS'

/**
 * INITIAL STATE
 */
const playlists = {}

/**
 * ACTION CREATORS
 */
const getUser = playlists => ({ type: GET_PLAYLISTS, playlists })

/**
 * THUNK CREATORS
 */
export const getPlaylists = () => async dispatch => {
  try {
    const res = await axios.get('/api/spotify/playlists')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = playlists, action) {
  switch (action.type) {
    case GET_PLAYLISTS:
      return { ...state, state: action.playlists }
    default:
      return state
  }
}
