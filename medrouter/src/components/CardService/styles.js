import styled from 'styled-components';

export const Container = styled.div`
  width: 220px;
  height: 370px;

  padding-top: 10px;

  box-shadow: 4px 4px 3px #707070;
  background-color: #fff;

  display: flex;
  flex-direction: column;

  align-items: center;
  border-radius: 4px;
`;

export const Text = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    color: #000000;
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    font-style: italic;
  }
`;

export const Img = styled.div`
  width: 200px;
  height: 300px;

  img {
    border-radius: 4px 4px 4px 4px;
    width: 100%;
    height: 100%;
  }
`;
