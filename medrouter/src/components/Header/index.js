import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// import { setPageModeRequest } from '~/store/modules/page/actions';

// import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import Menu from '~/components/Menu';

import { Container, Content, StyledButton } from './styles';

export default function Header() {
  // const profile = useSelector(state => state.user.profile);

  // const dispatch = useDispatch();

  function handleClick() {
    //  dispatch(setPageModeRequest(true));
  }

  function handleHome() {
    // å dispatch(setPageModeRequest(false));
  }
  return (
    <Container>
      <Content>
        <NavLink onClick={handleHome} to="/">
          <img src={logo} alt="logo" width="163px" height="134px" />
        </NavLink>

        <nav>
          <div>
            <div>
              <NavLink onClick={handleClick} to="/budgets">
                <StyledButton primary>Orçamento</StyledButton>
              </NavLink>
              <NavLink to="/signin">
                <StyledButton>Login</StyledButton>
              </NavLink>
            </div>
            <Menu logged />
          </div>
        </nav>
      </Content>
    </Container>
  );
}
