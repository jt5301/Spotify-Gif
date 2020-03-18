import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  let URI = document.documentURI
  console.log(URI)
  const { access_token, refresh_token } = deparam(URI)
  console.log('access', access_token, 'refresh', refresh_token)
  const { email } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
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

