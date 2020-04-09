import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  opacity: 0.8;
  div {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    height: 31px;
    width: 121px;

    border: none;

    background-color: ${props => (props.primary ? '#df7e38' : '#707070')};

    color: #fff;
    font-size: 20px;
    border-radius: 4px;

    font-family: Helvetica, sans-serif;

    margin: 0 5px 0 5px;

    &:hover {
      opacity: 0.6;
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .primary {
    background-color: #df7e38;
  }

  .hide {
    display: none;
  }
`;
