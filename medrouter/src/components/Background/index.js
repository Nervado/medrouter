import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// import { useDispatch } from 'react-redux';

import { Container } from './styles';

export default function Background({ logged, spaOn }) {
  // const dispatch = useDispatch();
  function handleClick() {
    //  dispatch(setPageModeRequest(true));
  }
  // /onClick={handleHome}
  return (
    <Container logged={logged ? 1 : 0} spaOn={spaOn ? 1 : 0}>
      <img alt="" />
      <div className="wrapper-primary">
        <NavLink onClick={handleClick} to="/budgets">
          <div>
            <h1>
              Onde seus sonhos tornam-se <span>realidade!</span>
            </h1>
            <br />
            <h2>
              Clique aqui para um orçamento <span>Grátis!</span>
            </h2>
          </div>
        </NavLink>
      </div>
    </Container>
  );
}

Background.propTypes = {
  logged: PropTypes.bool,
  spaOn: PropTypes.bool,
};

Background.defaultProps = {
  logged: false,
  spaOn: false,
};
