import React from 'react';
import PropTypes from 'prop-types';

import {
  FaInfo,
  FaCalendarDay,
  FaTrash,
  FaFontAwesomeFlag,
  FaHome,
} from 'react-icons/fa';

import { MdTimer } from 'react-icons/md';

import { Container } from './styles';

export default function TicketList({
  handleView,
  handleEdit,
  handleDelete,
  tickets,
}) {
  return (
    <Container primary>
      {}
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <div className="ticket">
              <span className="header">Chamado #{ticket.id}</span>
              <span className="body">
                <div className="info">
                  <span>
                    <FaInfo color="green" />
                  </span>
                  <span className="info-text">{ticket.title}</span>
                </div>
                <div className="info">
                  <span>
                    <FaCalendarDay color="green" />
                  </span>
                  <span className="info-text">Aberto em: {ticket.date}</span>
                </div>
                <div className="info">
                  <span>
                    <FaFontAwesomeFlag color={ticket.ended ? 'red' : 'green'} />
                  </span>
                  <span className="info-text">Status: {ticket.status}</span>
                </div>
                <div className="info">
                  <span>
                    <MdTimer color="green" />
                  </span>
                  <span className="info-text">
                    Prazo de resposta: {30} horas
                  </span>
                </div>
                <div className="info">
                  <span>
                    <FaHome color="green" />
                  </span>
                  <span className="info-text">Categoria: {ticket.theme}</span>
                </div>
              </span>
              <span className="footer">
                <button
                  type="button"
                  onClick={() => handleEdit(ticket)}
                  className={ticket.ended ? 'hide' : ''}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleView(ticket)}
                >
                  Visualizar
                </button>
                <FaTrash
                  size={20}
                  onClick={() => handleDelete(ticket.id)}
                  className={ticket.ended ? 'hide' : 'icon'}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

TicketList.propTypes = {
  handleView: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  tickets: PropTypes.arrayOf([
    {
      id: PropTypes.number,
      info: PropTypes.string,
      date: PropTypes.string,
      budget: PropTypes.string,
    },
  ]),
};

TicketList.defaultProps = {
  handleView: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
  tickets: [],
};
