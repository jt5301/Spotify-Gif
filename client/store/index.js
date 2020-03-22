import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import playlists from './playlists'
import artists from './artists'
import tracks from './tracks'

const reducer = combineReducers({
  user,
  playlists,
  artists,
  tracks
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './playlists'
export * from './artists'
export * from './tracks'
