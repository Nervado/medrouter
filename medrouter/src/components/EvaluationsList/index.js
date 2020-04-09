import React from 'react';

import ShortEvaluation from '~/components/ShortEvaluation';

import { Container, Content, Title } from './styles';

export default function EvaluationsList({ onClick }) {
  return (
    <Container>
      <Content>
        <Title>Avaliações</Title>
        <ul>
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
          <ShortEvaluation onClick={onClick} />
        </ul>
      </Content>
    </Container>
  );
}
