import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from '../store/user'
import { getPlaylists } from '../store/playlists'


/**
 * COMPONENT
 */

const Profile = () => {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.user.state)
  const playlists = useSelector(state => state.playlists.state)
  /* analogous to :
  const mapState = state => {
  return {
  state: state.user.state   }*/
  console.log(profile)
  useEffect(() => {
    dispatch(getInfo())
    dispatch(getPlaylists())
  }, [])//similar to calling a dispatch in componentdidmount

  return (
    <main>
      <h3>Welcome {profile ? profile.display_name : ''}</h3>
      <a href='https://accounts.spotify.com/en/status'>LogOut</a>
      <div>
        <img src={profile ? profile.images[0].url : ''} />
        <p>{playlists ? playlists.items.length : ''}</p>
        <p>playlists:</p>
      </div>
      <div>
        <p>{profile ? profile.followers.total : ''}</p>
        <p>Followers</p>
      </div>
      <div>
        <p>Following</p>
      </div>
    </main>
  )
}

export default Profile
