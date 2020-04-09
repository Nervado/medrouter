import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  width: 100%;
  background-color: #fff;

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;
    font-family: Helvetica, sans-serif;
    font-size: 18px;
    background-color: rgba(112, 112, 112, 0.1);

    .partial {
      width: 33%;
      height: 100%;

      div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 40%;
          margin-top: -5px;
          margin-left: 10px;
        }
        div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
`;
