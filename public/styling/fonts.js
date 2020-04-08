import styled from 'styled-components'


export const HeaderFont = styled.h1`
  font-family: 'Circular Std';
  font-weight:900;
  font-style:normal;
  font-size:40px;
  ;
`

export const CategoryFont = styled.h1`
  font-family: 'Circular Std';
  font-weight:500;
  font-style:normal;
  font-size:25px;
  ;
`

export const MainButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export const TimeButtons = styled.button`
  color:white;
  background:transparent;
  border:transparent;
  font-family: 'Circular Std';
  font-weight:500;
  font-style:normal;
  font-size:18px;
  outline:none;
  color:grey;
  transition: 0.3s;
  &:hover{
    color:white
  }
  &:active,
  &:focus{
    text-decoration: underline;
    color:white
  }

`


