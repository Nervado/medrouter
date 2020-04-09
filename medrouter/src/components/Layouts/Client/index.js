import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Client({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Client.propTypes = {
  children: PropTypes.element.isRequired,
};
