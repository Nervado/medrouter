import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.div`
  min-width: 800px;
  display: flex;
  justify-content: space-between;
`;

export const StyledNavLink = styled(NavLink)`
  color: #707070;
  font-size: 20px;
  text-decoration: none;
  font-family: Helvetica;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
    color: #df7e38;
  }
`;
