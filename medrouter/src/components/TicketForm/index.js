/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

import { useFormContext, Controller } from 'react-hook-form';

import DropdownMenu from '../DropdownMenu';
import { Container, Input, InputArea, TextArea } from './styles';

export default function TicketForm({ data }) {
  const { register, methods } = useFormContext();

  return (
    <Container {...methods}>
      <InputArea>
        <Input
          ref={register}
          shk={0}
          grow={0}
          width="100%"
          name="title"
          placeholder="Titulo do chamado"
        />
      </InputArea>

      <InputArea>
        <Controller
          as={<DropdownMenu defaultValue={data.projectId} />}
          name="projectId"
          onChange={selected => {
            return selected;
          }}
          className="dropdown"
          shk={1}
          grow={1}
          placeholder="Selecione o projeto"
          list={[
            'Eletricista',
            'Marceneiro',
            'Pedreiro',
            'Pintor',
            'Encanador',
          ]}
        />
      </InputArea>
      <InputArea>
        <Controller
          as={<DropdownMenu defaultValue={data.theme} />}
          name="theme"
          onChange={selected => {
            return selected;
          }}
          className="dropdown"
          shk={1}
          grow={1}
          placeholder="Selecione o assunto"
          list={[
            'Visita técnica',
            'Atraso',
            'Execução',
            'Profissionais',
            'Duvida',
            'Elogio',
          ]}
        />
      </InputArea>
      <TextArea>
        <textarea
          ref={register}
          name="description"
          id="1"
          cols="30"
          rows="10"
          placeholder="Descreva aqui sua mensagem..."
        />
      </TextArea>

      <div className="ticket-footer">
        <button type="submit" className="send">
          Enviar
        </button>
        <button type="button" className="clear">
          <FaTrash color="#707070" size={16} />
        </button>
      </div>
    </Container>
  );
}

TicketForm.propTypes = {
  data: PropTypes.shape({
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

TicketForm.defaultProps = {
  data: {
    id: null,
    title: '',
    themne: '',
    projectId: '',
    description: '',
    status: '',
    date: '',
    ended: false,
  },
};
