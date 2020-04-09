import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  .trash-icon {
    cursor: pointer;
  }

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      background: #eee;
      box-shadow: 2px 2px 3px #707070;
    }

    .no-photo {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      background: #fff;

      display: flex;
      align-items: center;
      justify-content: center;

      box-shadow: 2px 2px 3px #707070;
    }

    input {
      display: none;
    }
  }
`;
