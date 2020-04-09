import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;

  ul {
    overflow: scroll;
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
`;

export const Title = styled.h1`
  height: 10%;
  width: 100%;

  font-family: Helvetica, sans-serif;
  font-size: 25px;
  color: #df7e38;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
