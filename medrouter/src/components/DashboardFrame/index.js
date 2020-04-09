/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react';
import { MdTimer, MdPerson } from 'react-icons/md';

import {
  FaUsers,
  FaCalendar,
  FaInfoCircle,
  FaCoins,
  FaMoneyBill,
} from 'react-icons/fa';
import { GoProject } from 'react-icons/go';

import { FiSend } from 'react-icons/fi';

import DashboardHeader from '~/components/DashboardHeader';

import { Container } from './styles';

const size = 24;

const icons = [
  <FaUsers color="#B42493" size={size} />,
  <MdTimer color="#6A3BC3" size={size} />,
  <FaInfoCircle color="#3B99C3" size={size} />,
  <FaCoins color="#24B498" size={size} />,

  <FaCalendar color="#DE2929" size={size} />,
  <FaInfoCircle color="#3b99c3" size={size} />,
  <FaCalendar color="#DDDD51" size={size} />,
  <FaInfoCircle color="#24B498" size={size} />,

  <MdTimer color="#DE2929" size={size} />,
  <FiSend color="#3B99C3" size={size} />,
  <FaInfoCircle color="#DDDD51" size={size} />,
  <FaCoins color="#24B498" size={size} />,

  <MdPerson color="#B42493" size={size} />,
  <FaCoins color="#6A3BC3" size={size} />,
  <GoProject color="#3B99C3" size={size} />,
  <FaMoneyBill color="#24B498" size={size} />,
];

export default function DashboardFrame({ children, type, data }) {
  function selectType() {
    switch (type) {
      case 'budgetView':
        return (
          <DashboardHeader
            icons={[icons[0], icons[1], icons[2], icons[3]]}
            data={[
              `${data.teamCount}`,
              `${data.goal} h`,
              `${data.status}`,
              `R$ ${data.value}`,
            ]}
            names={['Equipe', 'Prazo', 'Situação', 'Valor']}
            unreadCount={[4, 1, 4, 7]}
            hasUnread={[1, 0, 1, 1]}
          />
        );

      case 'projectView':
        return (
          <DashboardHeader
            icons={[icons[0], icons[1], icons[2], icons[3]]}
            data={[
              `${data.teamCount}`,
              `${data.goal} h`,
              `${data.status}`,
              `R$ ${data.value}`,
            ]}
            names={['Equipe', 'Prazo', 'Situação', 'Valor']}
            unreadCount={[4, 1, 4, 7]}
            hasUnread={[1, 0, 1, 1]}
          />
        );
      case 'pending':
        return (
          <DashboardHeader
            icons={[icons[8], icons[9], icons[10], icons[11]]}
            data={[
              `${data.pending}`,
              `${data.budgetCounts}`,
              `${data.projectCounts}`,
              `${data.effective}`,
            ]}
            names={['Pendentes', 'Enviados', 'Solicitados', 'Efetivados']}
            unreadCount={[4, 1, 4, 7]}
            hasUnread={[1, 0, 1, 1]}
          />
        );
      case 'general':
        return (
          <DashboardHeader
            icons={[icons[12], icons[13], icons[14], icons[15]]}
            data={[
              `${data.clients}`,
              `${data.budgets}`,
              `${data.projects}`,
              `R$ ${data.value
                .toFixed(2)
                .toString()
                .replace('.', ',')}`,
            ]}
            names={['Clientes', 'Orçamentos', 'Projetos', 'Faturamento']}
            unreadCount={[4, 1, 4, 7]}
            hasUnread={[1, 0, 1, 1]}
            colors={['#B42493', '#6A3BC3', '#3B99C3', '#24B498']}
          />
        );
      default:
        return (
          <DashboardHeader
            icons={[icons[0], icons[1], icons[2], icons[3]]}
            data={[`${data.teamCount}`, 'Prazo', 'Situação', 'Valor']}
            names={['Equipe', 'Prazo', 'Situação', 'Valor']}
            unreadCount={[4, 1, 4, 7]}
            hasUnread={[1, 0, 1, 1]}
          />
        );
    }
  }

  const child = selectType();

  return (
    <Container>
      {child}
      {children}
    </Container>
  );
}
