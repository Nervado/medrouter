import styled from 'styled-components';

export const Container = styled.form`
  margin-left: 20px;
  width: 90%;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  color: orange;
  font-family: Helvetica, sans-serif;
  font-size: 18px;

  background-color: #fff;

  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);

  .header {
    margin-top: 20px;

    h1 {
      color: #707070;
      font-display: Helvetica;
      font-size: 20px;
    }
  }
`;
