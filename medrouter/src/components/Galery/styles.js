import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: rgba(122, 122, 122, 0.2);

  .photo-header {
    width: 30%;
  }

  .photo-title {
    text-align: center;
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    color: #666;
    font-weight: none;

    width: 100%;

    background-color: rgba(112, 112, 112, 0.1);

    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  }

  .galery-footer {
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      height: 20px;
      width: 100px;

      border: none;

      color: #fff;
      font-size: 16px;
      border-radius: 4px;

      font-family: Helvetica, sans-serif;

      margin: 5px 5px 10px 5px;

      padding-top: 2px;
      padding-bottom: 2px;

      background-color: orange;

      &:hover {
        opacity: 0.6;
      }
    }

    .primary {
      height: 20px;
      width: 100px;

      border: none;

      color: #fff;
      font-size: 16px;
      border-radius: 4px;

      font-family: Helvetica, sans-serif;

      margin: 5px 5px 10px 5px;

      padding-top: 2px;
      padding-bottom: 2px;

      text-align: center;
      cursor: pointer;

      background-color: #df7e38;

      &:hover {
        opacity: 0.6;
      }

      input {
        display: none;
      }
    }
    .secondary {
      background-color: #707070;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  flex-wrap: wrap;

  overflow: scroll;

  padding: 10px 50px 10px 50px;

  .no-photos {
    .photo-wrapper {
      .photo-area {
        height: 200px;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(112, 112, 112, 0.2);
      }
    }
  }

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  .photo-wrapper {
    padding: 5px;
    width: 210px;
    height: 240px;

    margin: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    border-radius: 4px;

    background-color: #fff;

    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.16);

    .photo-area {
      border-radius: 4px;

      img {
        border-radius: 4px;
        width: 200px;
        height: 200px;
      }
    }
    .photo-footer {
      height: 20px;
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        cursor: pointer;
      }
    }
  }
`;
