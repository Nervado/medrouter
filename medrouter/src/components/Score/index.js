import React from 'react';
import { Container } from './styles';

import starM from '~/assets/starM.svg';

export default function Score() {
  return (
    <Container>
      <img src={starM} alt="star" />
      <span>4.5</span>
    </Container>
  );
}
