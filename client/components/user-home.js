import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
// const spotifyWebApi = new Spotify()

let URI = document.documentURI
const { access_token, refresh_token } = deparam(URI)
console.log(access_token)
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {}

  }
  async createPlaylist() {
    // console.log('hello')
    // try {
    //   let newPlaylist = await spotifyWebApi.createPlaylist('testPlaylist', { 'public': false })
    //   console.log(newPlaylist)
    // } catch (error) {
    //   console.error(error)
    // }
  }
  render() {
    return (
      <div>
        <h3>Welcome.</h3>
        <button type='button' onClick={() => this.createPlaylist()}>create playlist</button>
      </div >
    )
  }

}
function deparam(querystring) {
  // remove any preceding url and split
  querystring = querystring.substring(querystring.indexOf('/access') + 1).split('&');
  var params = {}, pair, d = decodeURIComponent;
  // march and parse
  for (var i = querystring.length - 1; i >= 0; i--) {
    pair = querystring[i].split('=');
    params[d(pair[0])] = d(pair[1] || '');
  }

  return params;
};//--  fn  deparam
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

