import React from 'react'
import { useSelector } from "react-redux";
// import { user } from './store/user'
import { Navbar } from './components'
import Routes from './routes'

const App = () => {
  const user = useSelector(state => state.user)
  return (
    <div >
      {user.userProfile ? <Navbar /> : ''}
      {/* <Navbar /> */}
      <Routes />
    </div>
  )
}

export default App
