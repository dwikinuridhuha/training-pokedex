import React from "react";
import styled from "styled-components";

export default function Nav() {
  return <NavBarStyle>Pokedex - Pokemon</NavBarStyle>;
}

const NavBarStyle = styled.nav`
  width: 100%;
  height: 50px;
  background-color: bisque;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;
