import styled from 'styled-components';

export const Container = styled.div`
  height: 150px;
  background: #fcfcfc;
  z-index: 1;
  width: 100%;

  box-shadow: 4px 4px 4px rgba(112, 112, 112, 0.4);
`;

export const Content = styled.div`
  width: 100%;

  background-color: rgba(112, 112, 112, 0.05);

  height: 150px;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  nav {
    height: 100px;

    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

export const StyledButton = styled.button`
  height: 30px;
  width: 120px;

  border: none;

  background-color: ${props => (props.primary ? '#df7e38' : '#707070')};

  color: #fff;
  font-size: 20px;
  border-radius: 4px;

  font-family: Helvetica, sans-serif;

  margin: 5px 5px 5px 5px;

  &:hover {
    opacity: 0.6;
  }
`;
