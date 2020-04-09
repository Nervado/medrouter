import styled from 'styled-components';

export const Container = styled.div`
  font-family: Helvetica, sans-serif;

  width: 500px;
  height: 550px;

  background-color: #fff;
  box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.16);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  color: #707070;

  .header {
    text-align: center;

    .title {
      font-size: 18px;
      color: #666;
    }
  }

  .orange {
    color: orange;
  }
  .content {
    overflow: scroll;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 10px 0 10px;

    .wide {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .col1,
    .col2 {
      height: 100%;
      width: 50%;
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
      margin-top: 2px;
      margin-bottom: 2px;
      display: flex;

      align-items: center;
      width: 100%;
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
    font-size: 16px;
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
