import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  height: 100%;
  align-self: center;
  margin-bottom: 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 50px;

  margin: 5px;
  margin-top: 10px;
  padding: 0 5px 0 5px;
  box-shadow: 2px 2px 3px 1px #df7e38;

  .trash-icon {
    cursor: pointer;
  }

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    .field {
      display: flex;
      align-items: center;
    }
    .icon {
      margin-right: 5px;
    }
    .file-added {
      width: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      color: #000000;
      font-size: 18px;
    }
    .no-file {
      font-size: 18px;

      opacity: 0.8;
      color: #707070;
      cursor: pointer;
      height: 50px;
      width: 100%;

      background: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    input {
      display: none;
    }
  }
`;
