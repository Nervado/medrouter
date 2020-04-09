import styled from 'styled-components';

export const Container = styled.form`
  width: 700px;

  font-family: Helvetica, sans-serif;

  box-shadow: 2px 2px 3px #df7e38;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 10px;

  background-color: #fff;
  justify-content: space-between;

  border-radius: 4px;

  .yup-warn {
    color: #df7e38;
    display: block;
  }
`;
