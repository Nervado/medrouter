import React from 'react';

import CardService from '~/components/CardService';

import projeto from '~/assets/projeto.jpg';
import laminado from '~/assets/laminado.png';
import gesso from '~/assets/gesso.png';
import especial from '~/assets/especial.png';
import planejados from '~/assets/planejados.png';
import rebaixamento from '~/assets/rebaixamento.png';

import { Container } from './styles';

export default function Caurosel() {
  return (
    <Container>
      <li>
        <CardService text="Projeto e construção" img={projeto} />
      </li>
      <li>
        <CardService text="Pisos laminados" img={laminado} />
      </li>
      <li>
        <CardService text="Trabalhos em gesso" img={gesso} />
      </li>
      <li>
        <CardService text="Móveis planejados" img={planejados} />
      </li>
      <li>
        <CardService text="Rebaixamento de teto" img={rebaixamento} />
      </li>
      <li>
        <CardService text="Iluminação especial" img={especial} />
      </li>
    </Container>
  );
}
