import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  height: 50px;

  font-size: 18px;

  padding: 0 5px 0 5px;

  box-shadow: 2px 2px 3px 1px #df7e38;

  flex: 0 1 230px;

  vertical-align: center;

  overflow-wrap: wrap;

  &.has-errors {
    box-shadow: 2px 2px 3px 1px #bc3a3a;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export const Title = styled.div`
  font-family: Helvetica, sans-serif;

  opacity: ${props => (props.selected.length ? 1 : 0.8)};
  color: ${props => (props.selected.length ? '#000000' : '#707070')};

  cursor: pointer;
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;

  .category {
    display: nome;
  }
`;

export const List = styled.ul`
  font-family: Helvetica, sans-serif;
  position: absolute;
  z-index: 10;

  width: 220px;
  height: 100px;
  background-color: #fff;
  list-style: none;
  display: ${props => (props.visible ? 'block' : 'none')};

  li {
    display: flex;
    align-content: right;
    width: 100%;
    position: relative;
  }

  button {
    text-align: center;
    font-family: Helvetica, sans-serif;
    color: #707070;
    font-weight: bold;
    &:hover {
      font-weight: bold;
      color: #df7e38;
    }
  }
`;

export const StyledButton = styled.button`
  border: none;
  background-color: #fff;
  width: 100%;
  height: 30px;
  text-align: left;

  font-family: Helvetica, sans-serif;
  font-size: 16px;

  &:hover {
    background-color: '#df7e38';
  }
`;
