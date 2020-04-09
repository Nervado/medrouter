import styled from 'styled-components';

export const Container = styled.form`
  width: 50%;

  font-family: Helvetica, sans-serif;

  box-shadow: 2px 2px 3px #df7e38;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 10px;

  background-color: #fff;
  justify-content: space-between;

  .logo-wrapper {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-left: 50px;
  }
`;
