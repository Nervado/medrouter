import React from 'react';
import { FaTools } from 'react-icons/fa';
import { MdPerson, MdSchool, MdWork } from 'react-icons/md';
import { GiElectric } from 'react-icons/gi';

import { Container } from './styles';

export default function Skills() {
  return (
    <Container>
      <div>
        <MdPerson style={{ color: '#BC3A3A' }} /> <span>Joao Faz tudo</span>
      </div>
      <div>
        <MdSchool style={{ color: '#1A46A8' }} />{' '}
        <span>Serralheiro com 10 anos de experiência</span>
      </div>
      <div>
        <MdWork style={{ color: '#6BAA34' }} /> <span>Serralheiro</span>
      </div>
      <div>
        <GiElectric style={{ color: '#6BAA34' }} /> <span>Eletricista</span>
      </div>
      <div>
        <FaTools style={{ color: '#6BAA34' }} /> <span>Mecânico</span>
      </div>
    </Container>
  );
}
