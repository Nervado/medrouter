import styled from 'styled-components';

export const Container = styled.div`
  font-family: Helvetica, sans-serif;
  color: #707070;

  width: 500px;
  height: 400px;

  background-color: #fff;
  box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.16);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;

  .header {
    text-align: center;
    width: 100%;

    .title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #666;

      span {
        vertical-align: center;
      }

      .title-icon {
        margin-top: 3px;
        margin-right: 10px;
      }
    }
  }

  .red {
    color: red;
  }
  .content {
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    padding: 0 10px 0 10px;

    .wide {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin: 1px 0px 1px 0px;
    }
    .col1,
    .col2 {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .col1 {
    }
    .col2 {
      margin-left: 20px;
    }

    .username {
      margin-top: 2px;
      margin-bottom: 2px;
      width: 100%;
      display: flex;
      align-items: center;
      /** border-bottom: 1px solid #707070;*/
    }

    .team {
      li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        /** border-bottom: 1px solid #707070; */

        margin: 2px 0 2px 0;

        .item {
          display: flex;
          align-items: center;
        }
      }
    }

    .text {
      margin-left: 10px;
      text-align: justify;
    }
    .description {
      display: flex;

      align-items: left;
      justify-content: left;
      width: 100%;
      height: 100px;

      overflow: scroll;
      /***border: 1px solid #df7e38; */
      border: 1px solid green;

      .text-area {
        width: 90%;
        margin-top: 2px;
        margin-bottom: 2px;
      }
    }
    .budget-area {
      /**  border-bottom: 1px solid #707070;*/

      width: 100%;
    }
  }

  .footer {
    height: 50px;
    display: flex;
  }
  button {
    height: 20px;
    width: 100px;

    border: none;

    color: #fff;
    font-size: 14px;
    border-radius: 4px;

    font-family: Helvetica, sans-serif;

    margin: 5px 5px 10px 5px;

    padding-top: 2px;
    padding-bottom: 2px;

    &:hover {
      opacity: 0.6;
    }
  }

  .primary {
    background-color: #df7e38;
  }
  .secondary {
    background-color: #707070;
  }

  .photo-button {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 5px;
    }
  }
`;

export const ResponseArea = styled.div`
  margin-top: 5px;
  display: flex;

  align-items: left;
  justify-content: left;
  width: 100%;
  height: 100px;

  /***border: 1px solid #df7e38; */
  border: 1px solid green;

  .text-area {
    width: 100%;
    margin-top: 2px;
    margin-bottom: 2px;
    border: none;
    padding: 1px;

    textarea {
      resize: none;
      overflow: scroll;
      margin-left: 10px;
      background-color: #fff;
      width: 95%;
      height: 95%;
      border: none;
      font-size: 16px;
      background-color: rgba(112, 112, 112, 0.1);
      font-family: Helvetica, sans-serif;

      margin-top: 2px;
      margin-bottom: 2px;
    }
  }
`;
