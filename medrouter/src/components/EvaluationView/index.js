/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaStar, FaUser, FaCoins, FaUsers, FaTrash } from 'react-icons/fa';
import { MdTimer, MdSend } from 'react-icons/md';
import { IoMdReturnLeft } from 'react-icons/io';

import { GiLifeBar } from 'react-icons/gi';

import { rgba } from 'polished';
import { Container, Content, Header, Body, Footer } from './styles';

import ScoreStarry from '../ScoreStarry';

const color = 'green';

const icons = [
  { icon: <GiLifeBar color={color} />, topic: 'Qualidade do serviço' },
  { icon: <FaCoins color={color} />, topic: 'Preço' },
  { icon: <MdTimer color={color} />, topic: 'Prazo' },
  { icon: <FaUsers color={color} />, topic: 'Suporte' },
];

const _ratting = {
  projectId: 1,
  team: [
    { id: 23, job: 'Eletricista', name: 'José do Patrocinio', ratting: 0 },
    { id: 22, job: 'Engenheiro', name: 'João da Perimetral', ratting: 0 },
    { id: 49, job: 'Pedreiro', name: 'Paulo Pedregoso', ratting: 0 },
    { id: 48, job: 'Pedreiro', name: 'Pedrosa Pedregulho', ratting: 0 },
    { id: 47, job: 'Pedreiro', name: 'Lucas Negão', ratting: 0 },
  ],
  topics: [
    { id: 1, name: 'general', value: 0 },
    { id: 2, name: 'price', value: 0 },
    { id: 3, name: 'goal', value: 0 },
    { id: 4, name: 'quality', value: 0 },
  ],
  overall: 5,
  opinion: 'Bla bla bla bla bla bla bla bla bla',
};

export default function EvaluationView({
  goBack = () => {},
  team,
  project,
  topics = [
    { id: 1, name: 'general', value: 0 },
    { id: 2, name: 'price', value: 0 },
    { id: 3, name: 'goal', value: 0 },
    { id: 4, name: 'quality', value: 0 },
  ],
}) {
  const [ratting, setRatting] = useState(_ratting);
  const [rattingTeam, setRattingTeam] = useState(team);
  const [rattingTopic, setRattingTopic] = useState(topics);

  function evaluateTotal() {
    const a = rattingTeam.reduce((b, c) => c.ratting + b, 0);

    const d = rattingTopic.reduce((b, c) => c.value + b, 0);
    const _overall = (a + d) / (rattingTopic.length + rattingTeam.length);
    const _ratt = ratting;
    _ratt.overall = _overall;
    setRatting({ ..._ratt });
  }

  function handleClick(id, rating) {
    const search = rattingTeam.map(item => {
      if (item.id === id) {
        item.ratting = rating;
      }

      return item;
    });

    setRattingTeam([...search]);

    evaluateTotal();
  }

  function handleClickTopic(index, rating) {
    const search = rattingTopic;
    search[index].value = rating;

    setRattingTopic([...search]);

    evaluateTotal();
  }

  return (
    <Container>
      <Content>
        <Header>
          <div className="header-wrapper">
            <div className="title">
              <span>
                Projeto #{`${project.id}`}: {project.title}
              </span>
            </div>
            <div className="score">
              <span>
                <FaStar />
              </span>
              <span>{ratting.overall.toFixed(1)}</span>
            </div>
          </div>
        </Header>

        <Body>
          <div className="rattings">
            {rattingTeam.map((member, i) => (
              <div className="team" key={member.name}>
                <div>
                  <span className="icon">
                    <FaUser color="green" />
                  </span>
                  <span>
                    {member.job}, {member.name}
                  </span>
                </div>
                <div className="starry">
                  <ScoreStarry
                    hide
                    rating={rattingTeam[i].ratting}
                    className="starry-score"
                    handleClick={handleClick}
                    id={rattingTeam[i].id}
                  />
                </div>
              </div>
            ))}
            {rattingTopic.map((topic, i) => (
              <div className="ratting" key={icons[i].topic}>
                <div className="rat">
                  <span className="icon">{icons[i].icon}</span>
                  <span> {icons[i].topic}</span>
                </div>
                <div className="starry">
                  <ScoreStarry
                    hide
                    rating={topic.value}
                    handleClickTopic={handleClickTopic}
                    id={i}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-area-wrapper">
            <span className="label">Sua Opinião geral:</span>
            <textarea name="opinion" id="opinion" cols="30" rows="10" />
          </div>
        </Body>

        <Footer>
          <div>
            <button type="button">
              <MdSend className="icon" />
              Enviar
            </button>
            <button type="button" onClick={goBack}>
              <IoMdReturnLeft className="icon" />
              Voltar
            </button>
            <button type="button">
              <FaTrash className="icon" color={rgba(0, 0, 0, 0.6)} /> Limpar
            </button>
          </div>
        </Footer>
      </Content>
    </Container>
  );
}
