import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 50px;

  font-family: Helvetica, sans-serif;
  font-size: 20px;
  color: #707070;

  ul {
    overflow: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
`;
