import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  width: 100px;
  height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 5px;

  img {
    border-radius: 25px;
    width: 50px;
    height: 50px;
    background: url(${'https://api.adorable.io/avatars/50/abott@adorable.png'});
  }

  span {
    color: #df7e38;
    font-size: 16px;
    font-weight: bold;
    font-family: Helvetica, sans-serif;
  }
`;
