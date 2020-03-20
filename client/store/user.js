import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })


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


// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

//may need history push somewhere here?

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, state: action.user }
    default:
      return state
  }
}
