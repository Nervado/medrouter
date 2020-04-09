import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
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

  .selected-date {
    display: none;
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
  opacity: ${props => (props.selected ? 1 : 0.8)};
  color: ${props => (props.selected ? '#000000' : '#707070')};

  cursor: pointer;
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

export const List = styled.div`
  position: absolute;
  z-index: 10;
  margin-top: 10px;

  border-bottom: 1px solid #df7e38;
  border-left: 1px solid #df7e38;
  border-right: 1px solid #df7e38;

  width: 225px;
  height: 285px;
  background-color: #fff;
  list-style: none;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    right: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
`;

export const HeaderCalendar = styled.div`
  width: 100%;
  height: 4em;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background-image: linear-gradient(orange, #df7e38);

  color: #fff;

  .year-wrapper {
    width: 100%;
    height: 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
    padding: 0 5px 0 5px;
    .year {
      font-size: 1em;
    }
    .icon {
      cursor: pointer;
    }
  }

  .week-days {
    width: 100%;
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .day-header {
      margin: 0 1px 0 1px;
      width: 28px;

      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
`;

export const HeaderBody = styled.div`
  background-color: #fff;

  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 5px 0 5px;
  flex-wrap: wrap;
  font-size: 1.2em;

  .day {
    margin: 0 1px 0 1px;
    width: 28px;
    border: 2px solid #ffff;

    &:hover {
      border: 2px solid #df7e38;
    }
  }
`;

export const StyledButton = styled.button`
  border: none;

  width: 100%;
  height: 30px;

  font-family: Helvetica, sans-serif;
  font-size: 16px;
  background-color: #fff;

  text-align: center;
  font-family: Helvetica, sans-serif;

  color: ${props => (props.selected ? '#df7e38' : '#707070')};
  font-weight: ${props => (props.selected ? 'bolder' : '')};

  &:hover {
    color: #df7e38;
  }
`;
