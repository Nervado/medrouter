/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MdWork,
  MdPerson,
  MdEmail,
  MdViewQuilt,
  MdToday,
  MdTimer,
} from 'react-icons/md';
import {
  FaCalendarTimes,
  FaCoins,
  FaUsers,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaRegBuilding,
  FaLightbulb,
  FaDoorClosed,
  FaWindows,
  FaCameraRetro,
} from 'react-icons/fa';

import { AiOutlineColumnWidth } from 'react-icons/ai';

import { FiFileText } from 'react-icons/fi';

import { GiBrickWall } from 'react-icons/gi';

import { Container } from './styles';

export default function BudgetView({
  admin,
  budget,
  onClick,
  handleAccept,
  getGalery,
}) {
  const size = 20;
  return (
    <Container admin={admin}>
      <div className="header">
        <h1 className="title">Orçamento #{budget.id}</h1>
      </div>
      <div className="content">
        <div className="col1">
          <div className="username">
            <span>
              {' '}
              <MdPerson size={size} color="green" />
            </span>

            <span className="text">
              {budget.name} {budget.surname}
            </span>
          </div>
          <div className="username">
            <span>
              <MdEmail size={size} color="green" />
            </span>

            <span className="text">{budget.email}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <FaPhone size={size} color="green" />
            </span>

            <span className="text">{budget.phoneNumber}</span>
          </div>
          <div className="username">
            <span className="wide">
              <FaMapMarkerAlt size={size} color="green" />
            </span>
            <span className="text">{budget.adress}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <FaHome size={size} color="green" />
            </span>

            <span className="text">{budget.category}</span>
          </div>
          <div className="description">
            <span className="wide">
              <FiFileText size={size} color="green" />
            </span>

            <span className="text">{budget.description}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <AiOutlineColumnWidth size={size} color="green" />
            </span>

            <span className="text">Largura: {budget.width}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <AiOutlineColumnWidth size={size} color="green" />
            </span>

            <span className="text">Altura: {budget.hight}</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <AiOutlineColumnWidth size={size} color="green" />
            </span>

            <span className="text">Profundidade: {budget.deepness}</span>
          </div>
        </div>
        <div className="col2">
          <div className="username">
            <span>
              {' '}
              <FaRegBuilding size={size} color="green" />
            </span>

            <span className="text">
              Número de andares: {budget.numberOfFloors}
            </span>
          </div>
          <div className="username">
            <span>
              {' '}
              <MdViewQuilt size={size} color="green" />
            </span>

            <span className="text">
              Número de cômodos: {budget.numberOfRooms}
            </span>
          </div>

          <div className="username">
            <span>
              <FaLightbulb size={size} color="green" />
            </span>

            <span className="text">
              Número de luminárias: {budget.numberOflights}
            </span>
          </div>
          <div className="username">
            <span>
              {' '}
              <GiBrickWall size={size} color="green" />
            </span>

            <span className="text">
              Número de paredes: {budget.numberOfWalls}
            </span>
          </div>
          <div className="username">
            <FaDoorClosed size={size} color="green" />
            <span className="text">
              Número de portas: {budget.numberOfDoors}
            </span>
          </div>
          <div className="username">
            <span>
              {' '}
              <FaWindows size={size} color="green" />
            </span>

            <span className="text">
              Número de janelas: {budget.numberOfWindows}
            </span>
          </div>
          <div className="budget-area">
            <span>
              <FaCoins size={size} color="orange" />
            </span>

            <span className="budget-value text">
              Estimativa:{' '}
              <span className={budget.sended ? 'text' : 'orange text'}>
                {budget.sended ? `R$${budget.budget},00` : 'pendente'}
              </span>
            </span>
          </div>
          <div className="username">
            <span className="wide">
              <MdToday size={size} color="green" />{' '}
            </span>
            <span className="text">Solicitado em: {budget.date}</span>
          </div>
          <div className="username">
            <MdTimer size={size} color="green" />
            <span className="text">Prazo desejado de 7 dias</span>
          </div>
          <div className="username">
            <span>
              {' '}
              <FaCalendarTimes size={size} color="green" />
            </span>

            <span className="text">
              Prazo possivel:{' '}
              <span className={budget.sended ? 'text' : 'orange text'}>
                {budget.sended ? `R$${budget.budget},00` : 'pendente'}
              </span>
            </span>
          </div>
          <div className="username team">
            <span className="wide">
              <FaUsers size={size} color="green" />
            </span>

            <span className="text">
              Equipe:{' '}
              <ul>
                {budget.team.map(pro => (
                  <li key={pro.name}>
                    <div className="professional item">
                      <MdPerson size={16} color="green" />
                      <span>{pro.name}</span>
                    </div>
                    <div className="especiality item">
                      <MdWork size={16} color="green" />
                      <span>{pro.skill}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </span>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="primary" onClick={handleAccept}>
          Aprovar
        </button>
        <button type="button" className="secondary" onClick={onClick}>
          Voltar
        </button>
        <button
          type="button"
          onClick={() => getGalery(budget)}
          className="secondary photo-button"
        >
          <span>
            <FaCameraRetro />
          </span>
          <span>Fotos</span>
        </button>
      </div>
    </Container>
  );
}

BudgetView.propTypes = {
  admin: PropTypes.bool,
  budget: PropTypes.object,
  onClick: PropTypes.func,
  handleAccept: PropTypes.func,
  getGalery: PropTypes.func,
};

BudgetView.defaultProps = {
  admin: false,
  budget: {},
  onClick: () => {},
  handleAccept: () => {},
  getGalery: () => {},
};
