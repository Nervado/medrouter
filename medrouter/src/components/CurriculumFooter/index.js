import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import Button from '~/components/Button';

import { Container } from './styles';

export default function CurriculumFooter({ onSubmit }) {
  return (
    <Container>
      <div>
        <NavLink to="/">
          <Button type="button" text="Inicio" />
        </NavLink>

        <Button primary type="submit" text="Enviar" onSubmit={onSubmit} />
      </div>
    </Container>
  );
}

CurriculumFooter.propTypes = {
  onSubmit: PropTypes.func,
};

CurriculumFooter.defaultProps = {
  onSubmit: () => {},
};
