import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ARTISTS = 'GOT_ARTISTS'
const GOT_SINGLE_ARTIST = 'GOT_SINGLE_ARTIST'

/**
 * INITIAL STATE
 */
const topArtists = {}

/**
 * ACTION CREATORS
 */
const gotArtists = artists => ({ type: GOT_ARTISTS, artists })
const gotSingleArtist = singleArtist => ({ type: GOT_SINGLE_ARTIST, singleArtist })
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

export const getSingleArtist = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/artist/${id}`)
    dispatch(gotSingleArtist(res.data))
  } catch (error) {
    console.error
  }
}


/**
 * REDUCER
 */
export default function (state = topArtists, action) {
  switch (action.type) {
    case GOT_ARTISTS:
      return { ...state, TopArtists: action.artists }
    case GOT_SINGLE_ARTIST:
      return { ...state, singleArtist: action.singleArtist }
    default:
      return state
  }
}
