import styled from 'styled-components';

export const Container = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background: url(${'https://api.adorable.io/avatars/100/abott@adorable.png'});
  }
`;
