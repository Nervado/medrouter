import styled from 'styled-components';

export const Container = styled.form`
  margin-left: 20px;
  width: 700px;

  font-family: Helvetica, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 10px;

  background-color: #fff;
  justify-content: space-between;

  box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.16);

  .header {
    font-family: Helvetica, sans-serif;
    font-size: 12px;

    margin-top: 10px;

    h1 {
      font-weight: bold;
      color: #df7e38;
      span {
        margin-left: 10px;
      }
    }
  }
`;

//
//  box-shadow: 2px 2px 3px #df7e38;
