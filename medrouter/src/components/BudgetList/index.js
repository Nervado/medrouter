import React from 'react';
import PropTypes from 'prop-types';

import {
  FaInfo,
  FaMoneyBill,
  FaCalendarDay,
  FaTrash,
  FaCoins,
} from 'react-icons/fa';

import { Container } from './styles';

export default function BudgetList({
  handleView,
  handleAccept,
  handleDelete,
  budgets,
}) {
  return (
    <Container primary>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id}>
            <div className="budget">
              <span className="header">
                <FaCoins color="green" /> Orçamento #{budget.id}
              </span>
              <span className="body">
                <div className="info">
                  <span>
                    <FaInfo color="green" />
                  </span>

                  <span className="info-text">{budget.description}</span>
                </div>
                <div className="info">
                  <span>
                    <FaMoneyBill color="green" />
                  </span>

                  <span className="info-text">
                    Estimativa: R$ {budget.budget},00
                  </span>
                </div>
                <div className="info">
                  <span>
                    <FaCalendarDay color="green" />
                  </span>

                  <span className="info-text">
                    {budget.finished ? 'Concluido em: ' : 'Solicitado em: '}
                    {budget.date}
                  </span>
                </div>
              </span>
              <span className="footer">
                <button
                  type="button"
                  onClick={() => handleAccept(budget.id)}
                  className={budget.accept ? 'hide' : ''}
                >
                  Aprovar
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => handleView(budget)}
                >
                  Visualizar
                </button>
                <FaTrash
                  className="icon"
                  size={20}
                  onClick={() => handleDelete(budget.id)}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

BudgetList.propTypes = {
  handleView: PropTypes.func,
  handleAccept: PropTypes.func,
  handleDelete: PropTypes.func,

  budgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      info: PropTypes.string,
      date: PropTypes.string,
      budget: PropTypes.string,
    }),
  ),
};

BudgetList.defaultProps = {
  handleView: () => {},
  handleAccept: () => {},
  handleDelete: () => {},
  budgets: [],
};
