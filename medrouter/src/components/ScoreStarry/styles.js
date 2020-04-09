import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 160px;
`;

export const Stars = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    width: 130px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .star {
      height: 20px;
      width: 20px;
      margin: 0 2px 0 2px;
    }
  }

  .rat {
    margin-left: 5px;

    width: 30px;
    font-family: Helvetica, sans-serif;
    color: #df7e38;
    font-size: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;

    text-shadow: 3px 3px 3px rgba(122, 122, 122, 0.2);
  }
`;

export const Resume = styled.div`
  display: ${props => (props.hide ? 'none' : '')};

  width: 100%;
  height: 80%;

  .add-info {
    height: 80%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .info {
      margin-left: 10px;
      height: 30%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      justify-content: flex-start;

      span {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
`;
