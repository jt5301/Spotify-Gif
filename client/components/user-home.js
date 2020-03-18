import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
// const spotifyWebApi = new Spotify()
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

