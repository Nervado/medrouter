import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(112, 112, 112, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 90%;
  height: 90%;
  background-color: #fff;

  box-shadow: 3px 3px 4px rgba(112, 112, 122, 0.2);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.div`
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: #707070;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
`;

export const Body = styled.div`
  height: 70%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const SearchInput = styled.div`
  border: 1px solid green;

  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 5px 10px 5px 10px;

  .search-area {
    width: 100%;

    padding: 10px;

    input {
      width: 95%;

      border: none;

      font-family: Helvetica, sans-serif;
      color: #707070;
      font-size: 16px;
    }
  }

  .icon-area {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;

export const SearchOutput = styled.div`
  margin-top: 5px;
  height: 120px;
  width: 100%;
  padding: 10px;
  padding-right: 20px;
  border: 1px solid green;

  display: flex;
  align-items: center;
  justify-content: center;

  display: ${props => (props.hidden ? 'none' : 'flex')};
  overflow-y: scroll;

  .output {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .search-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-item-name {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        span {
          margin: 2px 4px 2px 4px;
        }
      }
      .action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: '#df7e38';
        span {
          margin: 2px 4px 2px 4px;
          color: #df7e38;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    --primary: green;
    --size: 32px;
    content: ' ';
    display: block;
    width: var(--size);
    height: var(--size);
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--primary);
    border-color: var(--primary) transparent var(--primary) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Team = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;

  margin-top: 5px;
  height: 120px;
  width: 100%;
  padding: 10px;
  padding-right: 20px;
  border: 1px solid green;

  display: flex;
  align-items: center;
  justify-content: center;

  display: ${props => (props.hidden ? 'none' : 'flex')};
  overflow-y: scroll;

  .output {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .search-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-item-name {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        span {
          margin: 2px 4px 2px 4px;
        }
      }
      .action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: '#df7e38';

        span {
          margin: 2px 4px 2px 4px;
          color: #df7e38;
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
  }

  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    --primary: green;
    --size: 32px;
    content: ' ';
    display: block;
    width: var(--size);
    height: var(--size);
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--primary);
    border-color: var(--primary) transparent var(--primary) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 0 5px 5px 0;

  button {
    cursor: pointer;
    color: #fff;
    border: none;
    font-size: 16px;
    width: 80px;
    height: 20px;
    background-color: #df7e38;
    margin: 5px;
    border-radius: 4px;
    &:hover {
      opacity: 0.6;
    }
  }
  .secondary {
    background-color: #707070;
  }
`;
