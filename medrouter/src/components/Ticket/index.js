/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';

import TicketForm from '~/components/TicketForm';

import { Container } from './styles';

export default function Ticket({ ticket }) {
  const methods = useForm({
    defaultValues: ticket,
  });

  const onSubmit = data => {
    // console.log(data);
    return data;
  };
  return (
    <FormContext {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="header">
          <h1>{ticket.id ? `Editar chamado #${ticket.id}` : 'Novo chamado'}</h1>
        </div>
        <TicketForm data={ticket} />
      </Container>
    </FormContext>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    theme: PropTypes.string,
    projectId: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
    ended: PropTypes.bool,
  }),
};

Ticket.defaultProps = {
  ticket: {
    id: null,
    title: '',
    theme: '',
    projectId: '',
    description: '',
    status: '',
    date: '',
    ended: false,
  },
};
