import styled from 'styled-components';

export const Container = styled.div`
  height: 450px;
  width: 100%;
  background-color: rgba(112, 112, 112, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 440px;
  width: 550px;

  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(112, 112, 112, 0.3);
`;
export const Header = styled.div`
  height: 50px;
  width: 100%;

  font-family: Helvetica, sans-serif;
  color: #707070;
  font-size: 16px;

  padding: 2px;

  .header-wrapper {
    height: 50px;
    width: 100%;
    padding: 5px 10px 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      width: 350px;
      height: 50px;
      overflow: hidden;

      span {
      }
    }

    .score {
      display: flex;
      align-items: center;
      font-size: 32px;
      color: #df7e38;
    }
  }
`;
export const Body = styled.div`
  width: 100%;
  height: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  /**atencao */

  .rattings {
    height: 270px;
    overflow-y: scroll;

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    color: #707070;
    font-family: Helvetica, sans-serif;
    font-size: 16px;

    .icon {
      margin-right: 10px;
    }

    .team,
    .ratting {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10px 0px 10px;

      .starry {
        border: 1px solid #fff;
        cursor: pointer;
        &:hover {
          opacity: 0.9;
          border: 1px solid #df7e38;
        }
      }
    }
  }

  .text-area-wrapper {
    height: 100px;

    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 5px 10px 0px 10px;

    .label {
      height: 20px;
      color: #707070;
      font-size: 14px;
    }

    textarea {
      height: 80px;
      resize: none;
      border: 1px solid green;
      padding: 5px;
      font-size: 14px;
      color: #707070;
      font-family: Helvetica, sans-serif;
      overflow: scroll;
    }
  }
`;
export const Footer = styled.div`
  height: 40px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
      background-color: #df7e38;
      border-radius: 4px;
      height: 20px;
      width: 100px;
    }

    button + button {
      background-color: #707070;
    }

    button {
      font-family: Helvetica, sans-serif;
      font-size: 14px;
      color: #fff;
      border: none;

      display: flex;
      align-items: center;
      justify-content: center;

      margin: 0px 5px 0px 5px;

      &:hover {
        opacity: 0.6;
      }

      .icon {
        margin-right: 4px;
      }
    }
  }
`;
