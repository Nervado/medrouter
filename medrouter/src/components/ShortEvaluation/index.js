/* eslint-disable react/prop-types */
import React from 'react';

import { Container, Content, Text } from './styles';

import MiniAvatar from '~/components/MiniAvatar';

import Score from '~/components/Score';

export default function ShortEvaluation({ onClick }) {
  return (
    <Container onClick={onClick}>
      <Content>
        <MiniAvatar />
        <Text>
          <span>
            {' '}
            “Foi uma experiência incrível usar os serviços da C&V Reformas bla
            bla lorem lorem ypilson lorem lero lero blaas bla bla bla bla
            reformas muito boas procura a 34s0ft para um atedimento feito sob
            medida bla bla bla blba ajvadjvad dlvladval sdmvlsd kvdmddjnsdvnsld
            nlsn lksdlsmd smldms dkmvsd mvlskm dlsml kmslmlfms”
          </span>
        </Text>
        <Score />
      </Content>
    </Container>
  );
}
