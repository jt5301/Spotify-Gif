import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getInfo, } from '../store/user'
import { getPlaylists } from '../store/playlists'
import TopArtistsProfView from './topArtistsProfView'
import TopTracksProfView from './topTracksProfView'
import { HeaderFont, MainButton } from '../../public/styling/fonts'

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
  console.log(profile, playlists)
  useEffect(() => {
    dispatch(getInfo())
    dispatch(getPlaylists())
  }, [])//similar to calling a dispatch in componentdidmount
  return (
    <main>
      <div>
        <div className='profile' >
          <img className='profilePortrait'
            src={profile ? (profile.images.length != 0 ? profile.images[0].url : '') : ''} />
        </div>

        <div className='profile' >
          <HeaderFont>{profile ? profile.display_name : ''}</HeaderFont>
        </div>

      </div>
      <div style={{ paddingBottom: '20px' }}>
        <div className='profileRow'>
          <div className='artistCategories'>Followers
            <div>{profile ? profile.followers.total : ''}</div>
          </div>
          <div className='artistCategories'>Follows
          <div>{profile ? profile.follows.artists.items.length : ''}</div>
          </div>
          <div className='artistCategories'>Playlists
            <div>
              {playlists ? playlists.length : ''}
            </div>
          </div>
        </div>
      </div>

      <div className='profTrackArtistView'>
        <TopArtistsProfView />
        <TopTracksProfView />
      </div>

      <div className='profile'>
        <a href='https://accounts.spotify.com/en/status'>LOGOUT</a>
      </div>

    </main>
  )
}

export default Profile
