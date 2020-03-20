import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from '../store/user'


/**
 * COMPONENT
 */

const profile = () => {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.user.state)
  /* analogous to :
  const mapState = state => {
  return {
  state: state.user.state   }*/
  console.log(profile)
  useEffect(() => {
    dispatch(getInfo())
  }, [])//similar to calling a dispatch in componentdidmount

  return (
    <main>

      <h3>Welcome {profile ? profile.display_name : ''}</h3>

    </main>
  )
}


export default profile

// class profile extends React.Component {
//   render() {
//     return (
//       <div>hello</div>
//     )
//   }
// }
// export default profile

// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { getInfo } from '../store/user'

// /**
//  * COMPONENT
//  */
// class profile extends React.Component {
//   constructor() {
//     super()
//     this.state = {}

//   }
//   async createPlaylist() {

//   }
//   async componentDidMount() {
//     await this.props.getInfo()
//   }
//   render() {
//     console.log(this.props.state)
//     return (
//       <div>
//         <h3>Welcome {this.props.state ? this.props.state.display_name : ''}</h3>
//         <button type='button' onClick={() => this.createPlaylist()}>create playlist</button>
//       </div >
//     )
//   }

// };//--  fn  deparam
// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     state: state.user.state

//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getInfo: () => { dispatch(getInfo()) }
//   }
// }
// export default connect(mapState, mapDispatch)(profile)

// /**
//  * PROP TYPES
//  */
// profile.propTypes = {
//   email: PropTypes.string
// }

