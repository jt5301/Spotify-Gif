import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ARTISTS = 'GOT_ARTISTS'

/**
 * INITIAL STATE
 */
const topArtists = {}

/**
 * ACTION CREATORS
 */
const gotArtists = artists => ({ type: GOT_ARTISTS, artists })

/**
 * THUNK CREATORS
 */
export const getArtists = (limit, time) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/topArtists/${time}/${limit}`)
    dispatch(gotArtists(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = topArtists, action) {
  switch (action.type) {
    case GOT_ARTISTS:
      return { ...state, TopArtists: action.artists }
    default:
      return state
  }
}
