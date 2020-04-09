/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { FaSearch } from 'react-icons/fa';

import SearchItem from '~/components/SearchItem';

import {
  Container,
  Content,
  SearchInput,
  SearchOutput,
  Footer,
  Body,
  Header,
  Team,
} from './styles';

function Props(
  name = 'Joao',
  surname = 'Pedrosa da Silva',
  job = 'Eletricista',
  hired = false,
  busy = false,
  stars = 4.78,
) {
  this.id = (
    Math.random() * 100 * (Math.random() * 100) +
    Math.random()
  ).toFixed(0);
  this.name = name;
  this.surname = surname;
  this.job = job;
  this.hired = hired;
  this.busy = busy;
  this.stars = stars;
}

const busy = new Props();

busy.busy = true;

const results = [new Props(), new Props(), busy, new Props(), new Props()];

export default function Search({
  title = 'Projeto #456 - Associar membros de equipe',
}) {
  const [hidden, setHidden] = useState(false);

  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [team, setTeam] = useState([]);

  useEffect(() => {
    setList(results);
  }, []);

  function handleHired(id, action = 'add', data) {
    if (action === 'add') {
      setTeam([data, ...team]);

      const updatedList = list.filter(member => {
        if (member.id !== id) return member;
        return null;
      });

      setList([...updatedList]);
    }

    if (action === 'remove') {
      setList([data, ...list]);
      const updatedTeam = team.filter(member => {
        if (member.id !== id) {
          return member;
        }
        return null;
      });

      setTeam([...updatedTeam]);
    }
  }

  return (
    <Container>
      <Content>
        <Header onClick={() => setHidden(!hidden)}>{title}</Header>
        <Body>
          <SearchInput>
            <div className="search-area">
              <input
                name="search"
                type="text"
                onClick={() => setLoading(true)}
              />
            </div>
            <div className="icon-area">
              <FaSearch
                color="green"
                size={20}
                onClick={() => {
                  setLoading(!loading);
                }}
              />
            </div>
          </SearchInput>
          <SearchOutput hidden={hidden}>
            {loading ? (
              <div className="loading">
                <div className="lds-dual-ring" />
              </div>
            ) : (
              <div className="output ">
                {list.map(data => (
                  <SearchItem
                    {...data}
                    handleHired={handleHired}
                    key={data.id}
                  />
                ))}
              </div>
            )}
          </SearchOutput>
          <Team>
            {loading ? (
              <div className="loading">
                <div className="lds-dual-ring" />
              </div>
            ) : (
              <div className="output ">
                {team &&
                  team.map(data => (
                    <SearchItem
                      {...data}
                      handleHired={handleHired}
                      key={data.id}
                    />
                  ))}
              </div>
            )}
          </Team>
        </Body>
        <Footer>
          <button type="button" className="secondary">
            Voltar
          </button>
          <button type="submit">Salvar</button>
        </Footer>
      </Content>
    </Container>
  );
}
