import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Login, Profile, Artists, Tracks, Playlists, ArtistProfile, TrackProfile, SinglePlaylist, RecommendedSongs } from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData()
  // }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch >
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path='/artists' component={Artists} />
        <Route path='/artist/:id' component={ArtistProfile} />
        <Route path='/tracks' component={Tracks} />
        <Route path='/track/:id' component={TrackProfile} />
        <Route path='/playlists' component={Playlists} />
        <Route path='/playlist/:id' component={SinglePlaylist} />
        <Route path='/RecommendedSongs' component={RecommendedSongs} />
        {/* {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
        {/* <Route path="/profile" component={profile} />

          </Switch>
        )}
        Displays our Login component as a fallback */} */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: state.loggedIn
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
