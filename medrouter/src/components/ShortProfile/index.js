import React from 'react';

import Skills from '~/components/Skills';

import { Container, Content } from './styles';

import MiniAvatarRound from '~/components/MiniAvatarRound';

import ScoreStarry from '~/components/ScoreStarry';

export default function ShortProfile() {
  return (
    <Container>
      <Content>
        <MiniAvatarRound />
        <Skills />
        <ScoreStarry rating={1.6} />
      </Content>
    </Container>
  );
}
