import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import Button from '~/components/Button';

import { Container } from './styles';

export default function BudgetFooter({
  fieldsProgress,
  logged,
  update,
  onSubmit,
}) {
  const location = useLocation();

  return (
    <Container logged={logged && !fieldsProgress}>
      <div>
        <NavLink
          className={`button ${
            location.pathname === '/budgets/details' ? 'hide' : ''
          }`}
          to="/"
        >
          <div className="child-link">Inicio</div>
        </NavLink>
        <NavLink
          onClick={update}
          className={`button primary ${
            location.pathname === '/budgets/details' ? 'hide' : ''
          }`}
          to="/budgets/details"
        >
          <div className="child-link">Continuar</div>
        </NavLink>
        <NavLink
          onClick={update}
          className={`button ${location.pathname === '/budgets' ? 'hide' : ''}`}
          to="/budgets"
        >
          <div className="child-link">Voltar</div>
        </NavLink>

        <Button
          primary
          text="Enviar"
          hide={location.pathname === '/budgets'}
          onSubmit={onSubmit}
        />
      </div>
    </Container>
  );
}

BudgetFooter.propTypes = {
  fieldsProgress: PropTypes.bool,
  logged: PropTypes.bool,
  update: PropTypes.func,
  onSubmit: PropTypes.func,
};

BudgetFooter.defaultProps = {
  fieldsProgress: false,
  logged: false,
  onSubmit: () => {},
  update: () => {},
};
