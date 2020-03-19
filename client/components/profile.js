import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getInfo } from '../store/user'

/**
 * COMPONENT
 */
class profile extends React.Component {
  constructor() {
    super()
    this.state = {}

  }
  async createPlaylist() {

  }
  async componentDidMount() {
    let userInfo = await this.props.getInfo()
  }
  render() {
    console.log(this.props.state)
    return (
      <div>
        <h3>Welcome {this.props.state ? this.props.state.display_name : ''}</h3>
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
    state: state.user.state

  }
}

const mapDispatch = dispatch => {
  return {
    getInfo: () => { dispatch(getInfo()) }
  }
}
export default connect(mapState, mapDispatch)(profile)

/**
 * PROP TYPES
 */
profile.propTypes = {
  email: PropTypes.string
}

