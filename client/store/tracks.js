import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_TRACKS = 'GOT_TRACKS'

/**
 * INITIAL STATE
 */
const topTracks = {}

/**
 * ACTION CREATORS
 */
const gotTracks = tracks => ({ type: GOT_TRACKS, tracks })

/**
 * THUNK CREATORS
 */
export const getTracks = (limit, time) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/topTracks/${time}/${limit}`)
    dispatch(gotTracks(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = topTracks, action) {
  switch (action.type) {
    case GOT_TRACKS:
      return { ...state, topTracks: action.tracks }
    default:
      return state
  }
}
