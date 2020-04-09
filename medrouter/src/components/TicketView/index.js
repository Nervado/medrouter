/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdTimer, MdRecordVoiceOver } from 'react-icons/md';
import {
  FaCalendarTimes,
  FaHome,
  FaTimesCircle,
  FaInfoCircle,
  FaTrash,
  FaCommentAlt,
} from 'react-icons/fa';

import { FiFileText } from 'react-icons/fi';

import { Container, ResponseArea } from './styles';

export default function TicketView({ admin, ticket, onClick }) {
  const size = 18;
  const [coment, setComent] = useState('');
  return (
    <Container admin={admin}>
      <div className="header">
        <h1 className="title">
          <span className="title-icon">
            <MdRecordVoiceOver color="green" />
          </span>
          <span>Chamado #{ticket.id}</span>
        </h1>
      </div>
      <div className="content">
        <div className="col1">
          <div className="username">
            <span>
              {' '}
              <FaInfoCircle size={size} color="green" />
            </span>

            <span className="text">{ticket.title}</span>
          </div>
          <div className="username">
            <span>
              <FaTimesCircle size={size} color="green" />
            </span>

            <span className="text">{ticket.theme}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <FaHome size={size} color="green" />
            </span>

            <span className="text">{ticket.projectId}</span>
          </div>
          <div className="username">
            <span className="wide">
              <FaCalendarTimes size={size} color="green" />
            </span>
            <span className="text">Aberto em {ticket.date}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <MdTimer size={size} color="green" />
            </span>

            <span className="text">{ticket.status}</span>
          </div>

          <div className="description">
            <span className="wide">
              <FiFileText size={size} color="green" />
            </span>

            <span className="text text-area">{ticket.description}</span>
          </div>

          <ResponseArea>
            <div className="wide">
              <FaCommentAlt size={16} color="green" />
            </div>
            <div className="text-area">
              <textarea
                name="response"
                id="resp"
                onChange={e => setComent(e.target.value)}
                value={coment}
              />
            </div>
          </ResponseArea>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="primary" onClick={() => {}}>
          Enviar
        </button>
        <button type="button" className="secondary" onClick={onClick}>
          Voltar
        </button>
        <button
          type="button"
          onClick={() => setComent('')}
          className="secondary photo-button"
        >
          <span>
            <FaTrash />
          </span>
          <span>Apagar</span>
        </button>
      </div>
    </Container>
  );
}

TicketView.propTypes = {
  admin: PropTypes.bool,

  onClick: PropTypes.func,
};

TicketView.defaultProps = {
  admin: false,

  onClick: () => {},
};
