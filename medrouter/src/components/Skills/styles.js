import styled from 'styled-components';

export const Container = styled.div`
  height: 90%;
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  overflow: scroll;

  font-family: Helvetica, sans-serif;
  font-size: 18px;

  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;
