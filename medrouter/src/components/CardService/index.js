import React from 'react';

import PropTypes from 'prop-types';

import { Container, Text, Img } from './styles';

export default function CardService({ text, img }) {
  return (
    <Container>
      <Img>
        <img src={img} alt="" />
      </Img>
      <Text>
        <div>{text}</div>
      </Text>
    </Container>
  );
}

CardService.propTypes = {
  text: PropTypes.string,
  img: PropTypes.string,
};

CardService.defaultProps = {
  text: '',
  img: '',
};
