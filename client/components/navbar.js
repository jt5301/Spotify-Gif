import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { logout } from '../store'
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

  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: #040306;
  text-align: center;
  z-index: 99;
`;


const Navbar = () => (
  <Nav>
    <Button>test</Button>
    <Button>test</Button>
  </Nav>
);

export default Navbar
