import React from 'react';

import { Container } from './styles';

import ShortProfile from '~/components/ShortProfile';

export default function ProfessionalsList() {
  return (
    <Container>
      <ul>
        <ShortProfile />
        <ShortProfile />
        <ShortProfile />
        <ShortProfile />
        <ShortProfile />
        <ShortProfile />
        <ShortProfile />
        <ShortProfile />
      </ul>
    </Container>
  );
}
