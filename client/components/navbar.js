import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  justify-content:space-between;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: #040306;
  text-align: center;
`;

const MainNav = styled.nav`
  display:flex;
  flex-direction:column;
`

const MenuItem = styled.ul`
padding-inline-start: 0px;
  color: grey;
  font-size: 13px;
  a {
    display: flex;
    padding: 15px;
    justify-content:center;
    ${'' /* border-left: 5px solid transparent; */}
    ${'' /* width: 100%; */}
    height: 100%;
    transition: 0.3s;
    color:grey;
    &:hover,
    &:focus{
      color: white;
      background-color: grey;
    }
    &.active{
      background-color:#1DB954
    }
  }
  ${'' /* svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  } */}
`;

const Navbar = () => (
  <Nav>
    <Button>test</Button>
    <MainNav>

      <MenuItem>
        <NavLink to='/profile'>
          Profile
      </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink to='/artists'>
          Artists
      </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink to='/tracks'>
          Tracks
      </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink to='/playlists'>
          Playlists
      </NavLink>
      </MenuItem>

    </MainNav>
    <Button>test</Button>
  </Nav>
);

export default Navbar
