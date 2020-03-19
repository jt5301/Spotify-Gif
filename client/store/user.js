import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const LOGGED_IN = 'LOGGED_IN'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
// const loggedIn = () => ({ type: LOGGED_IN })

/**
 * THUNK CREATORS
 */
export const getInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/spotify/userinfo')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

// export const login = () => async dispatch => {
//   try {
//     console.log('hello')
//     dispatch(loggedIn())
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, state: action.user }
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
