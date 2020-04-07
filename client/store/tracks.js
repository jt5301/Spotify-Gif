import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_TRACKS = 'GOT_TRACKS'
const GOT_SINGLE_TRACK = 'GOT_SINGLE_TRACK'

/**
 * INITIAL STATE
 */
const topTracks = {}

/**
 * ACTION CREATORS
 */
const gotTracks = tracks => ({ type: GOT_TRACKS, tracks })
const gotSingleTrack = singleTrack => ({ type: GOT_SINGLE_TRACK, singleTrack })

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

export const getSingleTrack = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/track/${id}`)
    dispatch(gotSingleTrack(res.data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function (state = topTracks, action) {
  switch (action.type) {
    case GOT_TRACKS:
      return { ...state, topTracks: action.tracks }
    case GOT_SINGLE_TRACK:
      return { ...state, singleTrack: action.singleTrack }
    default:
      return state
  }
}
