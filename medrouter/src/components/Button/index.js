import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ primary, text, hide, onSubmit }) {
  return (
    <Container primary={primary ? 1 : 0} hide={hide}>
      <button name={text} onClick={onSubmit} type="submit">
        {text}
      </button>
    </Container>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  hide: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
  text: ' ',
  onSubmit: null,
  hide: false,
};
