import React from 'react';

import { Container, ChartCard } from './styles';

import RingLoading from '~/components/RingLoading';
import BarChart from '~/components/BarChart';

export default function ChartArea() {
  return (
    <Container>
      <ChartCard>
        <BarChart
          size={180}
          barLenght={10}
          data={[
            { id: 1, mounth: 'Jan', value: 34 },
            { id: 2, mounth: 'Fev', value: 20 },
            { id: 3, mounth: 'Mar', value: 2 },
            { id: 4, mounth: 'Abr', value: 10 },
            { id: 5, mounth: 'Mai', value: 15 },
            { id: 6, mounth: 'Jun', value: 12 },
            { id: 7, mounth: 'Jul', value: 20 },
            { id: 8, mounth: 'Ago', value: 25 },
            { id: 9, mounth: 'Set', value: 20 },
          ]}
          color="#6A3BC3"
          title="Orçamentos"
          gradient={['#a482c1', '#0f01b2']}
        />
      </ChartCard>
      <ChartCard>
        <BarChart
          size={180}
          barLenght={10}
          data={[
            { id: 1, mounth: 'Jan', value: 10 },
            { id: 2, mounth: 'Fev', value: 5 },
            { id: 3, mounth: 'Mar', value: 14 },
            { id: 4, mounth: 'Abr', value: 16 },
            { id: 5, mounth: 'Mai', value: 15 },
            { id: 6, mounth: 'Jun', value: 17 },
            { id: 7, mounth: 'Jul', value: 5 },
            { id: 8, mounth: 'Ago', value: 24 },
            { id: 9, mounth: 'Set', value: 20 },
          ]}
          color="#3B99C3"
          title="Projetos"
        />
      </ChartCard>
      <ChartCard>
        <RingLoading
          radius={100}
          stroke={15}
          progress={Math.random() * 100}
          color="#24B498"
          title="Orçamentos Enviados"
          icon="icon"
        />
      </ChartCard>
      <ChartCard>
        <RingLoading
          radius={100}
          stroke={15}
          progress={Math.random() * 100}
          color="#B42493"
          title="Projetos Concluídos"
          icon="icon"
        />
      </ChartCard>
    </Container>
  );
}
