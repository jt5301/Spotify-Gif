import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ARTISTS = 'GOT_ARTISTS'
const GOT_SINGLE_ARTIST = 'GOT_SINGLE_ARTIST'
const GOT_RECDARTISTS = 'GOT_RECDARTISTS'
const GOT_RECDSONGS = 'GOT_RECDSONGS'

/**
 * INITIAL STATE
 */
const topArtists = {}

/**
 * ACTION CREATORS
 */
const gotArtists = artists => ({ type: GOT_ARTISTS, artists })
const gotSingleArtist = singleArtist => ({ type: GOT_SINGLE_ARTIST, singleArtist })

const gotRecommendedArtists = (recommendedArtists) => (
  {
    type: GOT_RECDARTISTS,
    recommendedArtists
  }
)

const gotRecommendedSongs = (recommendedSongs) => ({
  type: GOT_RECDSONGS,
  recommendedSongs
})

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

export const getRecommendedArtists = (artistId) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/relatedArtists/${artistId}`)
    let artistArray = res.data.artists
    if (artistArray.length > 10) {
      artistArray.splice(10, artistArray.length - 10)
    }
    dispatch(gotRecommendedArtists(artistArray))
  } catch (error) {
    console.log(error)
  }
}

export const getRecommendedSongs = (artistId) => async dispatch => {
  try {
    const res = await axios.get(`/api/spotify/artistTopSongs/${artistId}`)
    dispatch(gotRecommendedSongs(res.data.tracks))
  } catch (error) {
    console.log(error)
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
    case GOT_RECDSONGS:
      return { ...state, recdSongs: action.recommendedSongs }
    case GOT_RECDARTISTS:
      return { ...state, recdArtists: action.recommendedArtists }
    default:
      return state
  }
}
