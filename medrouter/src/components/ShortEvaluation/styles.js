import styled from 'styled-components';

export const Container = styled.li`
  margin-bottom: 20px;
  width: 100%;
  height: 80px;
  box-shadow: 4px 4px 5px #707070;

  background-color: #fff;

  border-radius: 4px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 0 10px 0 10px;
`;

export const Text = styled.div`
  height: 90%;
  width: 70%;
  display: flex;
  align-items: center;
  text-align: left;
  overflow: hidden;
  padding: 10px;

  span {
    width: 100%;
    text-align: left;

    color: #707070;
  }
`;
