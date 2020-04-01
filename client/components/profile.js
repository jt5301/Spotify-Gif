import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getInfo, } from '../store/user'
import { getPlaylists } from '../store/playlists'
import TopArtistsProfView from './topArtistsProfView'
import TopTracksProfView from './topTracksProfView'
import { HeaderFont } from '../../public/styling/fonts'

/**
 * COMPONENT
 */

const Profile = () => {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.user.userProfile)
  const playlists = useSelector(state => state.playlists.allPlaylists)
  /* analogous to :
  const mapState = state => {
  return {
  state: state.user.state   }*/
  useEffect(() => {
    dispatch(getInfo())
    dispatch(getPlaylists())
  }, [])//similar to calling a dispatch in componentdidmount
  return (
    <main>
      <div>
        <div className='profile' >
          <img className='profilePortrait'
            src={profile ? profile.images[0].url : ''} />
        </div>

        <div className='profile' >
          <HeaderFont>{profile ? profile.display_name : ''}</HeaderFont>
        </div>

        <div className='profile'>
          <a href='https://accounts.spotify.com/en/status'>LOGOUT</a>
        </div>

      </div>

      <div className='profileRow'>
        <p>{playlists ? playlists.length : ''}</p>
        <p>{profile ? profile.followers.total : ''}</p>
        <p>{profile ? profile.follows.artists.items.length : ''}</p>
      </div>

      <div className='profileRow'>
        <p>Playlists</p>
        <p>Followers</p>
        <p>Following</p>

      </div>
      <div className='profTrackArtistView'>
        <TopArtistsProfView />
        <TopTracksProfView />

      </div>


    </main>
  )
}

export default Profile
